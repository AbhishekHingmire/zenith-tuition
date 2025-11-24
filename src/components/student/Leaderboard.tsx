import { LeaderboardEntry } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal } from "lucide-react";

interface Props {
  entries: LeaderboardEntry[];
  currentStudentId: string;
}

export const Leaderboard = ({ entries, currentStudentId }: Props) => {
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-accent" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="class" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="class">My Class</TabsTrigger>
            <TabsTrigger value="all">All Students</TabsTrigger>
          </TabsList>

          <TabsContent value="class" className="space-y-2">
            {entries.map((entry) => {
              const isCurrentUser = entry.studentId === currentStudentId;
              const medal = getMedalEmoji(entry.rank);

              return (
                <div
                  key={entry.studentId}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    isCurrentUser
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="w-8 text-center font-bold">
                    {medal || `#${entry.rank}`}
                  </div>

                  {entry.avatar ? (
                    <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-sm">
                        {entry.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold truncate ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                      {entry.name}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Level {entry.level} • {entry.xp} XP
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {entry.badgeCount} 🏅
                    </Badge>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="all" className="space-y-2">
            <p className="text-sm text-muted-foreground text-center py-4">
              Full leaderboard coming soon!
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">
            🎯 Climb the leaderboard!
          </p>
          <p className="text-xs text-muted-foreground">
            Earn XP by attending classes, completing assignments, and scoring well in exams
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
