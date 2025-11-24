import { StudentProfile, Badge } from "@/types/student";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { Trophy, Flame, Target } from "lucide-react";

interface Props {
  profile: StudentProfile;
  badges: Badge[];
}

export const GamificationStats = ({ profile, badges }: Props) => {
  const xpPercentage = (profile.xp / profile.xpToNextLevel) * 100;
  const earnedBadges = badges.filter(b => b.earnedDate);

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Level and XP */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl">
                {profile.level}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Level {profile.level}</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.xp} / {profile.xpToNextLevel} XP
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Flame className="w-5 h-5 text-destructive" />
                  <span className="text-2xl font-bold text-foreground">{profile.streak}</span>
                </div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-foreground">{earnedBadges.length}</span>
                </div>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Target className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold text-foreground">#{profile.rank}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rank</p>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Level {profile.level + 1}</span>
              <span className="text-foreground font-medium">{Math.round(xpPercentage)}%</span>
            </div>
            <Progress value={xpPercentage} className="h-3" />
          </div>

          {/* Badges Showcase */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Recent Badges</h4>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.slice(0, 4).map((badge) => (
                <BadgeUI
                  key={badge.id}
                  variant="outline"
                  className={`px-3 py-2 ${
                    badge.rarity === 'legendary' ? 'border-accent bg-accent/10' :
                    badge.rarity === 'epic' ? 'border-primary bg-primary/10' :
                    badge.rarity === 'rare' ? 'border-secondary bg-secondary/10' :
                    'border-muted bg-muted/50'
                  }`}
                >
                  <span className="text-lg mr-2">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.name}</span>
                </BadgeUI>
              ))}
              {earnedBadges.length > 4 && (
                <BadgeUI variant="outline" className="px-3 py-2">
                  +{earnedBadges.length - 4} more
                </BadgeUI>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
