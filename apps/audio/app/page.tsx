import AudioContextDemo from "./components/AudioContextDemo";
import AudioNodeGraphQuiz from "./components/AudioNodeGraphQuiz";
import MediaElementSourceNodeExercise from "./components/MediaElementSourceNodeExercise";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-12">
      <AudioContextDemo />
      <hr className="border-white/10" />
      <AudioNodeGraphQuiz />
      <hr className="border-white/10" />
      <MediaElementSourceNodeExercise />
    </main>
  );
}
