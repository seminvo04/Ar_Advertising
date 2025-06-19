"use client";
import { DataTable } from "@/components/ui/data-table";
import { Edit, Trash2, Plus ,Eye} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ModalForm } from "@/components/ui/modal-form";
import { z } from "zod";
import { FilterOption } from "@/types/data-table";
import DeleteModal from "@/components/ui/DeleteModal";
import ModelViewer from "@/components/ModelViewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Model3D = {
  id: number;
  name: string;
  model_file: string;
  qr_code_image: string;
  scan_count: number;
  created_at: string;
  type: "static" | "animated" | "video"; // <-- ajouté
};


const Model3DPage = () => {

  const [models, setModels] = useState<Model3D[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const fetchModels = async () => {
    try {
      const token = localStorage.getItem("access");
      console.log("le token",token);
      const res = await fetch("http://localhost:8000/api/models3d/", {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
        
      });
      
      const data = await res.json();
      console.log("les mod",data);
      setModels(data);
    } catch (err) {
      toast.error("Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleSubmit = async (formData: any) => {
    try {
      const token = localStorage.getItem("access");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("type", formData.type);
      if (formData.model_file instanceof File) {
        data.append("model_file", formData.model_file);
      }

      const url = selectedModel
        ? `http://localhost:8000/api/models3d/${selectedModel.id}/`
        : `http://localhost:8000/api/models3d/`;

      const res = await fetch(url, {
        method: selectedModel ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error("Erreur serveur");

      toast.success(selectedModel ? "Modèle mis à jour" : "Modèle ajouté");
      setModalOpen(false);
      setSelectedModel(null);
      fetchModels();
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async () => {
    if (!selectedModel) return;
    try {
      const token = localStorage.getItem("access");
      await fetch(
        `http://localhost:8000/api/models3d/${selectedModel.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Modèle supprimé");
      fetchModels();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleteModalOpen(false);
      setSelectedModel(null);
    }
  };

  const columns = [
    { header: "Nom", accessorKey: "name" },
    {
      header: "Fichier",
      accessorKey: "model_file",
      cell: ({ row }: any) => (
        <a
          href={row.original.model_file}
          className="text-blue-500 underline"
          target="_blank"
          rel="noreferrer"
        >
          Télécharger
        </a>
      ),
    },
    {
      header: "QR Code",
      accessorKey: "qr_code_image",
      cell: ({ row }: any) =>
        row.original.qr_code_image ? (
          <img
            src={row.original.qr_code_image}
            alt="QR"
            className="h-16 w-16 object-contain"
          />
        ) : (
          "-"
        ),
    },
    {
  header: "Type",
  accessorKey: "type",
  cell: ({ row }: any) => {
    const type = row.original.type;
    const typeLabels: Record<string, string> = {
      static: "Statique",
      animated: "Animé",
      video: "Vidéo",
    };
    return typeLabels[type] || type;
  },
},

    { header: "Scans", accessorKey: "scan_count" },

    { header: "Créé le", accessorKey: "created_at" },
  ];

  const actions = [
    {
      label: "Modifier",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: Model3D) => {
        setSelectedModel(row);
        setModalOpen(true);
      },
      variant: "secondary" as const,
    },
    {
      label: "Supprimer",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (row: Model3D) => {
        setSelectedModel(row);
        setDeleteModalOpen(true);
      },
      variant: "destructive" as const,
    },
    {
    label: "Voir en 3D",
    icon: <Eye className="h-4 w-4" />,
    onClick: (row: Model3D) => {
      console.log("Fichier 3D :", row.model_file); // vérifie bien l'URL
      setPreviewUrl(row.model_file);
    },
     variant: "outline",
    }

  ];

  const filters: FilterOption[] = [
    {
      id: "name",
      label: "Nom",
      type: "text",
      options: [],
    },
  ];

  const fields = [
    {
      name: "name",
      label: "Nom",
      type: "text" as const,
      required: true,
      validation: z.string().min(3, "Le nom est requis"),
    },
    {
      name: "model_file",
      label: "Fichier 3D",
      type: "file" as const,
      required: !selectedModel, // obligatoire uniquement en création
      accept: ".glb,.gltf,.fbx,.obj", // à adapter à tes formats
    },
    {
  name: "type",
  label: "Type de modèle",
  type: "select" as const,
  required: true,
  options: [
    { label: "Statique", value: "static" },
    { label: "Animé", value: "animated" },
    { label: "Vidéo", value: "video" },
  ],
  validation: z.enum(["static", "animated", "video"], {
    required_error: "Le type est requis",
  }),
},

  ];

  return (
    <div className="flex mt-5 flex-col bg-background">
      <div className="flex-1 overflow-hidden bg-background">
        <div className="flex justify-between items-center px-2 mb-4">
          <h1 className="text-xl font-bold">Modèles 3D</h1>
          <Button onClick={() => setModalOpen(true)} variant="default">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un modèle
          </Button>
        </div>
        <div className="table-container md:w-[80%] mx-auto">
          <DataTable
            data={models}
            columns={columns}
            filters={filters}
            initialPageSize={10}
            actions={actions}
            isLoading={isLoading}
          />
                

        </div>
       <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
            setModalOpen(false);
            setSelectedModel(null);
        }}
        title={selectedModel ? "Modifier le modèle" : "Ajouter un modèle"}
        fields={fields}
        onSubmit={handleSubmit}
        // ⛔️ Ne pas pré-remplir les fichiers
       initialData={
        selectedModel
          ? {
              name: selectedModel.name,
              type: selectedModel.type,
            }
          : undefined
      }

        submitText={selectedModel ? "Mettre à jour" : "Ajouter"}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleDelete}
          onClose={() => setDeleteModalOpen(false)}
        />
       {/* Aperçu du modèle 3D dans un modal */}
<Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
  <DialogContent className="max-w-4xl w-full">
    <DialogHeader>
      <DialogTitle>Aperçu du modèle 3D</DialogTitle>
    </DialogHeader>
    {previewUrl && (
      <div className="w-full h-[500px]">
        <ModelViewer url={previewUrl} />
      </div>
    )}
  </DialogContent>
</Dialog>



      </div>
    </div>
  );
};

export default Model3DPage;
