import { Footer } from "../components/Footer";
import { Hero } from "../components/landingPage/Hero";

export function ChatPage() {
  return (
    <>
      <div className="mb-10">
        <Hero username="John" />
      </div>
      <Footer />
    </>
  );
}

export default ChatPage;
