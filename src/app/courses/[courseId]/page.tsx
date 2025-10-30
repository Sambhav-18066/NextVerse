
'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { PlayCircle, Lock, Loader2 } from 'lucide-react';
import { StarsBackground } from '@/components/stars-background';
import { VideoPlayer } from '@/components/ui/video-player';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { generateCourseContent, type GenerateCourseContentOutput } from '@/ai/flows/course-content-flow';

// Sample data - in a real app, this would come from a database
const courseData: { [key: string]: any } = {
  'Quantum Physics Explained': {
    title: 'Quantum Physics Explained',
    subTopics: [
      { id: '1', title: 'Introduction to Quantum States', videoId: 'a1z3uA_19-M', duration: '10:32', transcript: 'A quantum state is a mathematical entity that provides a probability distribution for the outcomes of each possible measurement on a system.' },
      { id: '2', title: 'Wave-Particle Duality', videoId: 'M7lc1UVf-VE', duration: '12:45', transcript: 'Wave-particle duality is the concept in quantum mechanics that every particle or quantum entity may be described as either a particle or a wave.' },
      { id: '3', title: 'The Uncertainty Principle', videoId: '7G3-g-2-gGU', duration: '8:15', transcript: 'The uncertainty principle, also known as Heisenberg\'s uncertainty principle, is any of a variety of mathematical inequalities asserting a fundamental limit to the precision with which the values for certain pairs of physical quantities of a particle, such as position and momentum, can be predicted from initial conditions.' },
      { id: '4', title: 'Quantum Entanglement', videoId: 'Zz_0hCZoA_c', duration: '14:20', transcript: 'Quantum entanglement is a physical phenomenon that occurs when a pair or group of particles is generated in such a way that the quantum state of each particle of the pair or group cannot be described independently of the state of the others, even when the particles are separated by a large distance.' },
      { id: '5', title: 'Quantum Tunneling', videoId: 'cTodS8hkSDg', duration: '9:58', transcript: 'Quantum tunnelling or tunneling is the quantum mechanical phenomenon where a wavefunction can propagate through a potential barrier.' },
    ],
  },
  // Add other courses here...
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = decodeURIComponent(params.courseId as string);
  const course = courseData[courseId] || { title: courseId, subTopics: [] };

  const [currentTopicId, setCurrentTopicId] = useState<string | null>(course.subTopics[0]?.id || null);
  const [unlockedTopics, setUnlockedTopics] = useState<Set<string>>(new Set(['1']));

  const [generatedContent, setGeneratedContent] = useState<{ [key: string]: GenerateCourseContentOutput }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [quizScore, setQuizScore] = useState<{ [key: string]: number | null }>({});

  const currentTopic = useMemo(() => {
    return course.subTopics.find((t: any) => t.id === currentTopicId) || null;
  }, [currentTopicId, course.subTopics]);

  const handlePlay = (topicId: string) => {
    if (unlockedTopics.has(topicId)) {
      setCurrentTopicId(topicId);
    }
  };

  const handleGenerateContent = async () => {
    if (!currentTopic) return;
    setIsGenerating(true);
    setGeneratedContent(prev => ({ ...prev, [currentTopic.id]: { summary: '', quiz: [] } }));
    try {
      const content = await generateCourseContent({
        title: currentTopic.title,
        transcript: currentTopic.transcript,
      });
      setGeneratedContent(prev => ({ ...prev, [currentTopic.id]: content }));
    } catch (error) {
      console.error("Failed to generate content:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAnswerChange = (question: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const handleSubmitQuiz = () => {
    if (!currentTopic || !generatedContent[currentTopic.id]?.quiz) return;

    const currentQuiz = generatedContent[currentTopic.id].quiz;
    let correctAnswers = 0;
    currentQuiz.forEach(q => {
      if (selectedAnswers[q.question] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / currentQuiz.length) * 100;
    setQuizScore(prev => ({...prev, [currentTopic.id]: score }));

    if (score >= 75) {
      const currentIndex = course.subTopics.findIndex((t: any) => t.id === currentTopic.id);
      if (currentIndex !== -1 && currentIndex + 1 < course.subTopics.length) {
        const nextTopic = course.subTopics[currentIndex + 1];
        setUnlockedTopics(prev => new Set(prev).add(nextTopic.id));
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-[#000000] via-[#0c0c2c] to-[#1a0f35] text-white p-4 sm:p-6 md:p-8">
      <StarsBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center animate-fade-in-up">
          {course.title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-8">
            <VideoPlayer videoId={currentTopic?.videoId || null} />

            {currentTopic && (
              <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Tabs defaultValue="summary">
                    <div className="flex justify-between items-center mb-4">
                      <TabsList className="bg-transparent border border-white/10 p-1">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="quiz">Quiz</TabsTrigger>
                      </TabsList>
                      {!generatedContent[currentTopic.id] && (
                        <Button onClick={handleGenerateContent} disabled={isGenerating}>
                          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Generate Content
                        </Button>
                      )}
                    </div>
                    
                    <TabsContent value="summary">
                      {isGenerating && !generatedContent[currentTopic.id]?.summary && <p>Generating summary...</p>}
                      <p className="text-white/80 leading-relaxed">{generatedContent[currentTopic.id]?.summary}</p>
                    </TabsContent>
                    
                    <TabsContent value="quiz">
                       {isGenerating && !generatedContent[currentTopic.id]?.quiz?.length && <p>Generating quiz...</p>}
                      {generatedContent[currentTopic.id]?.quiz?.length > 0 && (
                        <div className="flex flex-col gap-6">
                          {generatedContent[currentTopic.id].quiz.map((q, index) => (
                            <div key={index}>
                              <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                              <RadioGroup onValueChange={(value) => handleAnswerChange(q.question, value)}>
                                {q.options.map((opt, i) => (
                                  <div key={i} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt} id={`${q.question}-opt${i}`} />
                                    <Label htmlFor={`${q.question}-opt${i}`}>{opt}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          ))}
                          <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
                          {quizScore[currentTopic.id] !== undefined && quizScore[currentTopic.id] !== null && (
                             <div className="mt-4 p-4 rounded-lg bg-black/30">
                               <p className="text-lg font-bold">Your score: {quizScore[currentTopic.id]?.toFixed(2)}%</p>
                               {quizScore[currentTopic.id]! >= 75 ? (
                                 <p className="text-green-400">Congratulations! You passed. The next topic is unlocked.</p>
                               ) : (
                                 <p className="text-red-400">You need at least 75% to pass. Please try again.</p>
                               )}
                             </div>
                          )}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
            {course.subTopics.map((topic: any) => {
              const isLocked = !unlockedTopics.has(topic.id);
              return (
                <Card
                  key={topic.id}
                  onClick={() => handlePlay(topic.id)}
                  className={`border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20 cursor-pointer'
                  } ${currentTopicId === topic.id ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{topic.id}. {topic.title}</h3>
                      <p className="text-sm text-white/70">{topic.duration}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={isLocked}
                      className="rounded-full"
                      aria-label={isLocked ? "Locked" : `Play ${topic.title}`}
                    >
                      {isLocked ? <Lock className="h-6 w-6" /> : <PlayCircle className="h-8 w-8" />}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
