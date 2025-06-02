
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const EmailSupportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "normal"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message envoyé !",
      description: "Votre message a été envoyé à l'équipe support. Nous vous répondrons sous 24h.",
    });

    setIsSubmitting(false);
    navigate(-1);
  };

  const priorityOptions = [
    { value: "low", label: "Faible", color: "text-green-600" },
    { value: "normal", label: "Normal", color: "text-blue-600" },
    { value: "high", label: "Élevée", color: "text-orange-600" },
    { value: "urgent", label: "Urgent", color: "text-red-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Contacter le Support</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Header Info */}
        <div className="text-center mb-6">
          <div className="bg-forest/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Mail className="h-8 w-8 text-forest" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Email Support</h2>
          <p className="text-muted-foreground text-sm">
            Décrivez votre problème en détail et notre équipe vous répondra sous 24 heures.
          </p>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Formulaire de Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Votre nom complet"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Adresse email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="votre@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject">Sujet *</Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Résumé de votre demande"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <Label htmlFor="priority">Priorité</Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Décrivez votre problème ou votre question en détail..."
                  className="min-h-[120px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Plus vous donnez de détails, plus nous pourrons vous aider efficacement.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                className="w-full bg-forest hover:bg-forest/90"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le message
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Info */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Informations importantes</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Temps de réponse moyen : 24 heures</p>
              <p>• Support disponible : Lundi - Vendredi, 9h - 18h</p>
              <p>• Pour les urgences : utilisez le chat en direct</p>
              <p>• Adresse email : support@dogrunner.app</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailSupportPage;
