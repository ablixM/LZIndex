import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

interface TeamMember {
  name: string;
  image: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  { name: "JD", image: "/team/member1.png", initials: "JD" },
  { name: "AS", image: "/team/member2.png", initials: "AS" },
  { name: "MK", image: "/team/member3.png", initials: "MK" },
];

export function Footer() {
  return (
    <footer className="relative min-h-[200px] w-full footer-background">
      <div className="container relative z-10 flex justify-between items-end py-4 max-w-[1400px] mx-auto">
        <div className="flex items-center sm:px-6 px-4">
          {teamMembers.map((member, index) => (
            <Avatar
              key={index}
              className="-ml-3 first:ml-0 border-2 border-background"
            >
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
          ))}
          <span className="ml-4 text-sm text-white flex items-center ">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by our
            team
          </span>
        </div>
      </div>
    </footer>
  );
}
