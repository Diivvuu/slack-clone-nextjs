import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AuthScreen } from "@/features/auth/components/auth-screen";

export default function Home() {
  return (
    <div>
      <AuthScreen />
    </div>
  );
}
