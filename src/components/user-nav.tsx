
'use client';

import { createClient } from '@/lib/supabase/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserNavProps {
    user: User;
    isMobile?: boolean;
}

export function UserNav({ user, isMobile = false }: UserNavProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  
  const getInitials = (email: string) => {
    const parts = email.split('@');
    return parts[0].substring(0, 2).toUpperCase();
  }

  const triggerClasses = isMobile
    ? "flex items-center justify-start p-3 text-base font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300 w-full"
    : "relative h-8 w-8 rounded-full";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isMobile ? (
             <button className={triggerClasses}>
                <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                    <AvatarFallback>{user.email ? getInitials(user.email) : <UserIcon/>}</AvatarFallback>
                </Avatar>
                My Account
             </button>
        ) : (
            <Button variant="ghost" className={triggerClasses}>
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                    <AvatarFallback>{user.email ? getInitials(user.email) : <UserIcon/>}</AvatarFallback>
                </Avatar>
            </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">My Account</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
