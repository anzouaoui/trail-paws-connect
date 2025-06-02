
import React from "react";
import ChallengeCard from "./ChallengeCard";

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  price: number;
  currency: string;
  maxParticipants: number;
  currentParticipants: number;
  location: string;
  difficulty: "débutant" | "intermédiaire" | "avancé" | "expert";
  requiredEquipment: string[];
  rewards: string[];
  activityType: string;
  organizer: string;
  isRegistered: boolean;
}

interface ChallengesListProps {
  challenges: Challenge[];
  onChallengeRegister: (challengeId: string) => void;
}

const ChallengesList = ({ challenges, onChallengeRegister }: ChallengesListProps) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Défis à Venir</h2>
      <div className="space-y-4">
        {challenges.map(challenge => (
          <ChallengeCard 
            key={challenge.id}
            challenge={challenge}
            onRegister={onChallengeRegister}
          />
        ))}
      </div>
    </section>
  );
};

export default ChallengesList;
