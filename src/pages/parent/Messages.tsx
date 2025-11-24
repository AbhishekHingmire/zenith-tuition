import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageThread } from '@/components/parent/MessageThread';
import { MessageInput } from '@/components/parent/MessageInput';
import { 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  ArrowLeft,
  Pin,
  Bell,
  Megaphone,
  Filter,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { mockMessages, mockAnnouncements, mockNotifications } from '@/data/mockParentData';
import { Message, ChatMessage, Announcement, Notification } from '@/types/parent';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ParentMessages() {
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'teachers' | 'admin'>('all');

  // Mock chat messages for selected conversation
  const mockChatMessages: ChatMessage[] = selectedConversation ? [
    {
      id: '1',
      senderId: selectedConversation.from.name,
      senderRole: selectedConversation.from.role,
      content: 'Hello! I wanted to discuss Emma\'s recent progress.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-parent',
      senderRole: 'parent',
      content: 'Yes, please! I\'d love to hear about how she\'s doing.',
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
      isRead: true,
    },
    {
      id: '3',
      senderId: selectedConversation.from.name,
      senderRole: selectedConversation.from.role,
      content: selectedConversation.lastMessage,
      timestamp: selectedConversation.timestamp,
      isRead: false,
    },
  ] : [];

  const handleSendMessage = (content: string) => {
    toast.success('Message sent!');
    // In real implementation, this would send the message to the backend
  };

  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.from.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'teachers' && msg.from.role === 'teacher') ||
      (filterType === 'admin' && msg.from.role === 'admin');
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Communication Center</h1>
          <p className="text-muted-foreground mt-1">Stay connected with teachers and admin</p>
        </div>

        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <span>Messages</span>
              {mockMessages.reduce((acc, msg) => acc + msg.unreadCount, 0) > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {mockMessages.reduce((acc, msg) => acc + msg.unreadCount, 0)}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Megaphone className="w-4 h-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* MESSAGES TAB */}
          <TabsContent value="messages" className="space-y-0">
            <Card className="overflow-hidden">
              <div className="flex flex-col lg:flex-row h-[calc(100vh-280px)] min-h-[500px]">
                {/* Conversation List */}
                <div className={`${selectedConversation ? 'hidden lg:block' : 'block'} lg:w-80 border-r border-border flex flex-col`}>
                  {/* Search and filter */}
                  <div className="p-4 border-b border-border space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={filterType === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('all')}
                        className="flex-1"
                      >
                        All
                      </Button>
                      <Button
                        variant={filterType === 'teachers' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('teachers')}
                        className="flex-1"
                      >
                        Teachers
                      </Button>
                      <Button
                        variant={filterType === 'admin' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('admin')}
                        className="flex-1"
                      >
                        Admin
                      </Button>
                    </div>
                  </div>

                  {/* Conversations */}
                  <ScrollArea className="flex-1">
                    {filteredMessages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedConversation(msg)}
                        className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 touch-manipulation ${
                          selectedConversation?.id === msg.id ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {msg.from.avatar ? (
                            <img src={msg.from.avatar} alt={msg.from.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-primary-foreground font-semibold">
                                {msg.from.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="font-semibold text-foreground truncate">{msg.from.name}</p>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {msg.isPinned && <Pin className="w-3 h-3 text-muted-foreground" />}
                                <span className="text-xs text-muted-foreground">
                                  {format(msg.timestamp, 'h:mm a')}
                                </span>
                              </div>
                            </div>
                            
                            {msg.from.subject && (
                              <Badge variant="secondary" className="text-xs mb-1">
                                {msg.from.subject}
                              </Badge>
                            )}
                            
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm text-muted-foreground truncate">{msg.lastMessage}</p>
                              {msg.unreadCount > 0 && (
                                <Badge variant="destructive" className="flex-shrink-0">
                                  {msg.unreadCount}
                                </Badge>
                              )}
                            </div>
                            
                            {msg.isOnline && (
                              <div className="flex items-center gap-1 mt-1">
                                <div className="w-2 h-2 bg-secondary rounded-full" />
                                <span className="text-xs text-secondary">Online</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                {/* Chat Area */}
                {selectedConversation ? (
                  <div className="flex-1 flex flex-col">
                    {/* Chat header */}
                    <div className="p-4 border-b border-border flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="lg:hidden"
                          onClick={() => setSelectedConversation(null)}
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </Button>
                        
                        {selectedConversation.from.avatar ? (
                          <img 
                            src={selectedConversation.from.avatar} 
                            alt={selectedConversation.from.name} 
                            className="w-10 h-10 rounded-full flex-shrink-0" 
                          />
                        ) : (
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-foreground font-semibold">
                              {selectedConversation.from.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">
                            {selectedConversation.from.name}
                          </p>
                          {selectedConversation.from.subject && (
                            <p className="text-sm text-muted-foreground truncate">
                              {selectedConversation.from.subject}
                            </p>
                          )}
                          {selectedConversation.isOnline && (
                            <span className="text-xs text-secondary">Online</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="touch-manipulation">
                          <Phone className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="touch-manipulation">
                          <Video className="w-5 h-5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="touch-manipulation">
                              <MoreVertical className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem>Mute</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Block</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Messages */}
                    <MessageThread messages={mockChatMessages} currentUserId="current-parent" />

                    {/* Message input */}
                    <MessageInput onSend={handleSendMessage} />
                  </div>
                ) : (
                  <div className="hidden lg:flex flex-1 items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">💬</span>
                      </div>
                      <p className="text-lg font-medium">Select a conversation</p>
                      <p className="text-sm mt-1">Choose a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* ANNOUNCEMENTS TAB */}
          <TabsContent value="announcements" className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                All
              </Button>
              <Button variant="outline" size="sm">Urgent</Button>
              <Button variant="outline" size="sm">Events</Button>
              <Button variant="outline" size="sm">General</Button>
            </div>

            <div className="space-y-4">
              {mockAnnouncements.map((announcement) => (
                <Card key={announcement.id} className={`${
                  announcement.priority === 'urgent' ? 'border-l-4 border-l-destructive' : ''
                }`}>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {announcement.priority === 'urgent' && (
                            <Badge variant="destructive" className="animate-pulse">Urgent</Badge>
                          )}
                          <Badge variant="outline" className="capitalize">{announcement.category}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                          {announcement.postedBy.avatar ? (
                            <img 
                              src={announcement.postedBy.avatar} 
                              alt={announcement.postedBy.name} 
                              className="w-6 h-6 rounded-full" 
                            />
                          ) : null}
                          <span>{announcement.postedBy.name}</span>
                          <span>•</span>
                          <span>{format(announcement.postedAt, 'MMM d, h:mm a')}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground whitespace-pre-wrap">{announcement.content}</p>

                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {announcement.attachments.map((file, idx) => (
                          <Button key={idx} variant="outline" size="sm">
                            📎 {file.name}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{announcement.reactions.like}</span>
                        </button>
                        <span>Helpful ({announcement.reactions.helpful})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Attendance</Button>
                <Button variant="outline" size="sm">Fees</Button>
                <Button variant="outline" size="sm">Exams</Button>
              </div>
              <Button variant="outline" size="sm">Mark All as Read</Button>
            </div>

            <div className="space-y-2">
              {mockNotifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`${!notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        notification.type === 'attendance' ? 'bg-secondary/20' :
                        notification.type === 'fee' ? 'bg-accent/20' :
                        notification.type === 'exam' ? 'bg-primary/20' :
                        'bg-muted'
                      }`}>
                        <Bell className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground mb-1">{notification.title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-xs text-muted-foreground">
                            {format(notification.timestamp, 'MMM d, h:mm a')}
                          </span>
                          {notification.actionUrl && (
                            <Button variant="link" size="sm" className="h-auto p-0">
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>

                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
