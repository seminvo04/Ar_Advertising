import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Calendar, Clock } from "lucide-react";
import { Event } from "@/features/event/event.type"; // Vérifie le bon chemin




interface EventDetailsProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventDetails({ event, onClose }: EventDetailsProps) {
  if (!event) return null;

  // Fonction pour formater les dates (simulation)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir';
      case 'ongoing':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      default:
        return 'Non défini';
    }
  };

  const determineEventStatus = (startDate: string | Date): string => {
    const now = new Date();
    const eventDate = new Date(startDate);
    
    // Si la date de début est dans le futur
    if (eventDate > now) {
      return 'upcoming';
    }
    
    // Si la date de début est aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);
    
    if (eventDay.getTime() === today.getTime()) {
      return 'ongoing';
    }
    
    // Si la date de début est dans le passé
    return 'completed';
  };

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
   <DialogContent className="border-8 w-full  !max-w-[1200px] max-h-[90vh] overflow-y-auto">

        <DialogHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {event.name}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <Badge 
                  variant="outline"
                  className={`${getStatusColor(determineEventStatus(event.start_date))} font-medium`}
                >
                  {getStatusText(determineEventStatus(event.start_date))}
                </Badge>
                {/* {event.category && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                    {event.category}
                  </Badge>
                )} */}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
         

          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date et heure de début */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  Début de l&apos;événement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-gray-900">
                    {formatDate(event.start_date.toString())}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(event.start_date.toString())}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date et heure de fin */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-600" />
                  Fin de l&apos;événement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-gray-900">
                    {formatDate(event.end_date.toString())}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(event.end_date.toString())}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lieu */}
            <Card className="hover:shadow-md transition-shadow duration-200 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Lieu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-900 leading-relaxed">
                  {event.address}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métriques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ventes */}
            {/* {event.totalSales && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-green-700 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Chiffre d'affaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {event.totalSales.toLocaleString('fr-FR')} FCFA
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Total des ventes
                  </div>
                </CardContent>
              </Card>
            )} */}

            {/* Équipe */}
            {event.marchands && event.marchands.length > 0 && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Équipe de service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">
                    {event.marchands.length}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {event.marchands.length > 1 ? 'Serveurs assignés' : 'Serveur assigné'}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Liste des serveurs */}
          {event.marchands && event.marchands.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Membres de l&apos;équipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {event.marchands.map((waiter, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {waiter.user.first_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {waiter.user.first_name} {waiter.user.first_name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}