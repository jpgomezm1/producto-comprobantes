import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

export const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  const { user, signOut } = useAuth();

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="bg-card border-b border-border shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-40">
      {/* Lado izquierdo - Logo y menú móvil */}
      <div className="flex items-center space-x-4">
        {/* Botón de menú móvil */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-semibold text-primary hidden sm:block">
            Sistema de Comprobantes
          </h1>
        </div>
      </div>

      {/* Lado derecho - Usuario */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 h-auto py-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-secondary-blue text-secondary-blue-foreground text-sm">
                  {user?.email ? getInitials(user.email) : 'US'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {user?.email?.split('@')[0] || 'Usuario'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">
                {user?.email?.split('@')[0] || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email || 'usuario@email.com'}
              </p>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={signOut} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};