
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Heart, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  username: string;
  verified?: boolean;
  profileImage?: string;
  className?: string;
  timePosted?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  verified = false,
  profileImage,
  className,
  timePosted = "Il y a quelques minutes"
}) => {
  return (
    <div className={cn("w-full bg-black px-4 pt-2 pb-2", className)}>
      {/* User profile section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-gray-700">
            {profileImage ? (
              <AvatarImage src={profileImage} alt={username} />
            ) : (
              <AvatarFallback className="bg-comic-accent text-white">
                {username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-white">{username}</span>
              {verified && (
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-400">{timePosted}</p>
          </div>
        </div>
        <button className="rounded-full p-1 hover:bg-gray-800">
          <MoreHorizontal className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
