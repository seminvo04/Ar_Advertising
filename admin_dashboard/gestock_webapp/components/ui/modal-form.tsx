"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormFieldT, ModalFormProps } from "@/types/modal";
import { toast } from "sonner";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "./form";
import { MultiSelect } from "./Multiselct";

export function ModalForm<T>({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  initialData,
  submitText = "Enregistrer",
}: ModalFormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);

  

  // Création dynamique du schéma Zod
  const generateZodSchema = (fields: FormFieldT[]) => {
  const schema: Record<string, z.ZodTypeAny> = {};
  fields.forEach((field) => {
    if (field.type === "multiselect") {
      schema[field.name] = field.required
        ? z.array(z.string()).min(1, "Au moins un choix requis")
        : z.array(z.string()).optional();
    } else if (field.type === "file") {
      schema[field.name] = field.required
        ? z
            .any()
            .refine((val) => val instanceof File, {
              message: "Un fichier est requis",
            })
        : z.any().optional();
    } else {
      schema[field.name] =
        field.validation ||
        (field.type === "email"
          ? z.string().email("Email invalide")
          : field.required
          ? z.string().min(1, "Ce champ est requis")
          : z.string().optional());
    }
  });
  return z.object(schema);
};


  const form = useForm({
    resolver: zodResolver(generateZodSchema(fields)),
    defaultValues: initialData || {},
  });
  useEffect(() => {
    if (initialData) {
      form.reset(initialData); // ← met à jour les valeurs des champs
    }
  }, [initialData, form]);
  /* eslint-disable */
  const handleSubmit = async (data: any) => {
    try {
      console.log("data : " , data);
      setIsLoading(true);
      await onSubmit(data);
      onClose();
      toast.success("Opération réussie");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast.error("Une erreur est survenue");
    } finally {
      form.reset();
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                    {field.type === "multiselect" ? (
                      <MultiSelect
                        options={field.options || []}
                        selected={form.watch(field.name) || []} // récupère la sélection courante
                        onChange={(val: string[]) => form.setValue(field.name, val, { shouldValidate: true })}
                        getOptionValue={(option) => option.value.toString()}
                        getOptionLabel={(option) => option.label}
                      />
                    ) : field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                        >
                          <SelectTrigger>
                            <SelectValue 
                              placeholder={field.placeholder || `Sélectionner ${field.label}`} 
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem 
                                key={option.value.toString()} 
                                value={option.value.toString()}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'textarea' ? (
                        <Textarea
                          {...formField}
                          placeholder={field.placeholder}
                        />
                      ) : field.type === "file" ? (
  <Input
    type="file"
    accept={field.accept}
    onChange={(e) => {
      const file = e.target.files?.[0];
      form.setValue(field.name, file, { shouldValidate: true });
    }}
  />
) : (
  <Input
    {...formField}
    type={field.type}
    placeholder={field.placeholder}
    onChange={(e) => {
      if (field.type === 'number') {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        formField.onChange(value);
      } else {
        formField.onChange(e.target.value);
      }
    }}
    value={formField.value ?? ""}
  />
)
}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex justify-end gap-2">
              <Button 
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Chargement..." : submitText}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}