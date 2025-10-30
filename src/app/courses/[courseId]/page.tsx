
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { PlayCircle, Lock } from 'lucide-react';
import { StarsBackground } from '@/components/stars-background';
import { VideoPlayer } from '@/components/ui/video-player';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Sample data - in a real app, this would come from a database
const courseData: { [key: string]: any } = {
  'Quantum Physics Explained': {
    title: 'Quantum Physics Explained',
    subTopics: [
      { id: '1', title: 'Introduction to Quantum States', videoId: 'a1z3uA_19-M', duration: '10:32' },
      { id: '2', title: 'Wave-Particle Duality', videoId: 'q-i-p13HwGg', duration: '12:45' },
      { id: '3', title: 'The Uncertainty Principle', videoId: '7G3-g-2-gGU', duration: '8:15' },
      { id: '4', title: 'Quantum Entanglement', videoId: 'Zz_0hCZoA_c', duration: '14:20' },
      { id: '5', title: 'Quantum Tunneling', videoId: 'cTodS8hkSDg', duration: '9:58' },
    ],
  },
  // Add other courses here...
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = decodeURIComponent(params.courseId as string);
  const course = courseData[courseId] || { title: courseId, subTopics: [] };

  const [currentVideoId, setCurrentVideoId] = useState<string | null>(course.subTopics[0]?.videoId || null);
  const [unlockedTopics, setUnlockedTopics] = useState<Set<string>>(new Set(['1']));

  const handlePlay = (topicId: string, videoId: string) => {
    if (unlockedTopics.has(topicId)) {
      setCurrentVideoId(videoId);
      
      // Unlock the next topic
      const currentIndex = course.subTopics.findIndex((t:any) => t.id === topicId);
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
          <div className="md:col-span-2">
            <VideoPlayer videoId={currentVideoId} />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
            {course.subTopics.map((topic: any) => {
              const isLocked = !unlockedTopics.has(topic.id);
              return (
                <Card
                  key={topic.id}
                  className={`border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 ${
                    isLocked ? 'opacity-50' : 'hover:bg-white/20'
                  }`}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{topic.id}. {topic.title}</h3>
                      <p className="text-sm text-white/70">{topic.duration}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handlePlay(topic.id, topic.videoId)}
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
