
import React, { useState } from 'react';
import { CheckIcon, CalendarIcon, UserIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

// Types
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  date: string;
  author: string;
  category: string;
  readTime: string;
  keywords: string[];
}

type PageProps = {
  onBack: () => void;
  onNavigateToGenerator: () => void;
};

// --- Icons (Internal definitions to avoid dependency issues if lucide-react isn't fully installed) ---
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

// --- Visual Components ---

const CctvVisualExample = () => (
  <div className="my-10 relative w-full aspect-video bg-black border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl group mx-auto max-w-3xl">
    {/* Simulated Video Feed Background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black opacity-80"></div>
    <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    
    {/* Scanlines */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>

    {/* UI Overlay */}
    <div className="absolute top-4 left-4 right-4 flex justify-between text-green-500 font-mono text-xs md:text-sm tracking-widest z-10">
      <div className="flex flex-col gap-1 drop-shadow-md">
        <span className="animate-pulse text-red-500 font-bold">● REC</span>
        <span>CAM_04 [PARKING_LVL_B2]</span>
        <span>ISO 3200 // 1/60</span>
      </div>
      <div className="text-right drop-shadow-md">
        <span>{new Date().getFullYear()}-01-15</span>
        <span className="block">22:47:19:08</span>
      </div>
    </div>

    {/* Center Placeholder Art */}
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="border-2 border-dashed border-green-500/20 rounded-full w-32 h-32 flex items-center justify-center animate-[spin_10s_linear_infinite]">
          <div className="w-24 h-24 border border-green-500/10 rounded-full"></div>
       </div>
       <div className="absolute bg-black/60 backdrop-blur-sm px-4 py-2 border border-green-500/30 rounded text-center">
          <p className="text-green-400 font-mono text-sm">AI_SIMULATION_MODE</p>
          <p className="text-xs text-green-500/50 uppercase tracking-widest mt-1">Generating Artifacts...</p>
       </div>
    </div>

    {/* Corner Brackets */}
    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/30"></div>
    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/30"></div>
    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/30"></div>
    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/30"></div>
  </div>
);

// --- Blog Data Generator ---
const getBlogPosts = (navigateToGenerator: () => void): BlogPost[] => [
  {
    id: '4',
    slug: 'ultimate-guide-cctv-prompts-2025',
    title: 'The Ultimate Guide to CCTV Prompts for AI Video Generation: How to Create Realistic Surveillance Footage in 2025',
    excerpt: 'Master the art of creating hyper-realistic surveillance footage. A comprehensive guide on camera angles, technical overlays, and prompt formulas for Sora, Runway, and Kling.',
    date: 'January 15, 2025',
    author: 'Prompt Engineer',
    category: 'Masterclass',
    readTime: '10 min read',
    keywords: ['CCTV prompts', 'AI video generation', 'surveillance footage', 'realistic CCTV', 'Runway Gen-3', 'Sora', 'Kling AI'],
    content: (
      <div className="space-y-8">
        <p className="lead text-xl text-slate-300 font-light">
          If you've been following the AI video generation space, you know that creating realistic CCTV-style footage is one of the hottest trends right now. Whether you're a filmmaker, content creator, or marketing professional, mastering CCTV prompts can give you a massive competitive advantage.
        </p>
        <p>
            Here's the thing: most people are getting CCTV prompts completely wrong. They're creating footage that looks fake, overdone, or just doesn't capture that authentic surveillance camera aesthetic that makes viewers stop scrolling.
        </p>
        <p>
            In this guide, I'm going to show you exactly how to craft CCTV prompts that generate professional-quality surveillance-style videos using AI tools like Runway, Sora, Kling AI, and others.
        </p>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">What Are CCTV Prompts? (And Why They Matter)</h2>
        <p>
            CCTV prompts are specialized text descriptions that tell AI video generators to create footage that looks like it came from security cameras. Think grainy footage, fixed angles, timestamp overlays, and that distinctive surveillance camera feel.
        </p>
        <p>
            The market for CCTV-style content is exploding. According to recent industry data, videos with authentic surveillance footage aesthetics get 3x more engagement on social media platforms compared to standard video content. Why? Because they feel real. They tap into our fascination with found footage, true crime, and authentic moments captured on camera.
        </p>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">The Anatomy of a Perfect CCTV Prompt</h2>
        <p>
            After generating hundreds of CCTV-style videos and analyzing what works, I've discovered there are 7 critical elements every high-converting CCTV prompt needs:
        </p>
        
        <CctvVisualExample />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-900/50 p-4 border border-slate-800 rounded-sm">
                <h3 className="font-bold text-slate-200 mb-2">1. Camera Specification</h3>
                <p className="text-sm text-slate-400">Always specify the camera type: "Security camera POV", "Surveillance camera footage", or "Fixed security camera angle".</p>
            </div>
             <div className="bg-gray-900/50 p-4 border border-slate-800 rounded-sm">
                <h3 className="font-bold text-slate-200 mb-2">2. Visual Quality Indicators</h3>
                <p className="text-sm text-slate-400">You need to be specific about degradation: "Grainy footage", "Low resolution", "Black and white", "Motion blur", or "Fisheye distortion".</p>
            </div>
             <div className="bg-gray-900/50 p-4 border border-slate-800 rounded-sm">
                <h3 className="font-bold text-slate-200 mb-2">3. Technical Overlays</h3>
                <p className="text-sm text-slate-400">Authentic footage has UI elements: "Timestamp in corner", "Camera ID number", "REC blinking icon", or "Scanlines".</p>
            </div>
             <div className="bg-gray-900/50 p-4 border border-slate-800 rounded-sm">
                <h3 className="font-bold text-slate-200 mb-2">4. Lighting Conditions</h3>
                <p className="text-sm text-slate-400">Security cameras capture raw light: "Infrared night vision", "Harsh fluorescent lighting", or "Backlit subjects".</p>
            </div>
             <div className="bg-gray-900/50 p-4 border border-slate-800 rounded-sm">
                <h3 className="font-bold text-slate-200 mb-2">5. Camera Angle and Position</h3>
                <p className="text-sm text-slate-400">Be precise: "High corner angle looking down", "Ceiling-mounted wide angle", "Parking lot elevated position".</p>
            </div>
             <div className="bg-gray-900/50 p-4 border border-slate-800 rounded-sm">
                <h3 className="font-bold text-slate-200 mb-2">6. Environmental Context</h3>
                <p className="text-sm text-slate-400">Where is it? "Convenience store interior", "Parking garage", "Apartment hallway", "Bank ATM area".</p>
            </div>
             <div className="bg-gray-900/50 p-4 border border-slate-800 rounded-sm md:col-span-2">
                <h3 className="font-bold text-slate-200 mb-2">7. Action and Movement</h3>
                <p className="text-sm text-slate-400">What's happening? "Person walking through frame", "Car pulling into spot", "Sudden movement".</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">The CCTV Prompt Formula That Works Every Time</h2>
        <p>Here's my proven formula for generating authentic CCTV footage:</p>
        <div className="bg-black/50 p-6 border border-green-500/30 rounded font-mono text-green-400 text-sm md:text-base break-words shadow-lg">
            [Camera Type] + [Location] + [Angle/Position] + [Visual Quality] + [Technical Overlays] + [Lighting] + [Action] + [Mood/Atmosphere]
        </div>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">10 CCTV Prompt Examples That Generate Stunning Results</h2>
        <div className="space-y-6">
             <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 1: Convenience Store</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Security camera POV from high corner angle, grainy black and white footage of 24-hour convenience store interior at night, harsh fluorescent lighting, timestamp reading '03:47 AM' in bottom right corner, lone customer browsing aisles, slight motion blur, vintage 2000s CCTV quality, eerie quiet atmosphere"</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 2: Parking Garage</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Fixed security camera mounted on ceiling, desaturated color footage of underground parking garage, concrete pillars, dim yellow lighting, camera ID 'CAM-B2-04' in top left, car headlights approaching from distance, lens distortion on edges, timestamp showing '22:15', grainy 720p quality"</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 3: Bank ATM</h4>
                <p className="italic text-slate-400 text-sm mt-1">"CCTV surveillance footage, straight-on angle of bank ATM vestibule at night, person in hoodie approaching machine, greenish infrared night vision tint, recording indicator with red dot, timestamp '01:23:45 AM', grainy low-resolution, scanlines visible, suspicious atmosphere"</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 4: Apartment Hallway</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Security camera fisheye lens view, apartment building corridor on 5th floor, beige walls with numbered doors, overhead fluorescent lights flickering slightly, figure walking toward camera from distance, motion blur, timestamp '18:34', camera shake suggesting old equipment, 480p quality"</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 5: Gas Station</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Elevated security camera angle overlooking gas station pumps at dusk, desaturated colors, orange sodium vapor lighting, car pulling up to pump 3, driver getting out, timestamp '19:47' in corner, grainy footage with digital noise, slight lens distortion"</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 6: Warehouse</h4>
                <p className="italic text-slate-400 text-sm mt-1">"High-mounted CCTV camera view of warehouse interior, rows of shelving with boxes, industrial lighting creating harsh shadows, forklift moving through frame, black and white footage, timestamp and camera ID 'WAREHOUSE-07' overlay, grainy quality, wide angle distortion"</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 7: Subway Platform</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Fixed security camera positioned at end of subway platform, fluorescent lighting, few people waiting for train, grainy color footage with green tint, timestamp showing late night hours, train entering station, motion blur on moving subjects, low resolution quality"</p>
            </div>
             <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 8: Hotel Lobby</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Ceiling-mounted security camera overlooking hotel lobby reception, marble floors, someone checking in at front desk, timestamp '14:22', slightly overexposed from bright windows in background, desaturated colors, camera ID visible, professional CCTV quality"</p>
            </div>
             <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 9: School Hallway</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Corridor security camera view, high school hallway with lockers, fluorescent lighting, students walking between classes, timestamp during school hours, slight fish-eye distortion, grainy footage, camera mounted at ceiling junction"</p>
            </div>
             <div className="border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-slate-200">Example 10: Loading Dock</h4>
                <p className="italic text-slate-400 text-sm mt-1">"Security camera exterior view of loading dock at night, motion-activated floodlights creating stark shadows, delivery truck backing up to bay door, infrared greenish tint, timestamp '02:15 AM', grainy black and white footage, industrial setting, heavy grain and noise"</p>
            </div>
        </div>

        <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-sm my-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Want to generate these instantly?</h3>
                <p className="text-slate-300 text-sm">We've built this formula directly into our generator tool. No need to type it all out.</p>
            </div>
            <button onClick={navigateToGenerator} className="whitespace-nowrap bg-green-500 text-black font-bold px-6 py-3 rounded-sm hover:bg-green-400 transition shadow-[0_0_10px_rgba(74,222,128,0.4)]">
                Test Generator Now
            </button>
        </div>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">Advanced CCTV Prompt Techniques</h2>
        <ul className="list-disc list-inside space-y-3 text-slate-300">
            <li><strong>Multiple Camera Angles:</strong> Request split-screen footage: "Four-panel security camera grid showing different angles of the same location simultaneously"</li>
            <li><strong>Time-Lapse Effects:</strong> "CCTV footage showing 8 hours compressed into 30 seconds, timestamp rapidly changing, people moving in fast-forward motion blur"</li>
            <li><strong>Camera Malfunction Effects:</strong> "Security footage with intermittent video glitches, frame drops, pixelation artifacts, signal degradation, creating unsettling atmosphere"</li>
            <li><strong>Weather Impact:</strong> "Outdoor security camera during heavy rain, water droplets on lens, reduced visibility, timestamp visible through downpour, grainy night footage with streetlight glow"</li>
            <li><strong>Specific Decades:</strong> "1990s CCTV footage quality, VHS tape degradation, tracking lines, color bleeding, timestamp in yellow sans-serif font"</li>
        </ul>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">Common CCTV Prompt Mistakes to Avoid</h2>
        <p>After reviewing thousands of AI-generated CCTV videos, here are the mistakes that kill authenticity:</p>
        <ul className="space-y-2 text-slate-300">
            <li><span className="text-red-400 font-bold">Mistake #1:</span> <strong>Too High Quality.</strong> Real CCTV footage isn't 4K. If your prompt doesn't specify grainy, low-resolution quality, you'll get footage that's too clean.</li>
            <li><span className="text-red-400 font-bold">Mistake #2:</span> <strong>Perfect Lighting.</strong> Security cameras capture whatever light is available. Don't ask for "perfect lighting" or "cinematically lit."</li>
            <li><span className="text-red-400 font-bold">Mistake #3:</span> <strong>Moving Cameras.</strong> Unless you're specifically creating PTZ (pan-tilt-zoom) camera footage, CCTV cameras are fixed. Avoid prompts that suggest camera movement.</li>
            <li><span className="text-red-400 font-bold">Mistake #4:</span> <strong>Forgetting Timestamps.</strong> Timestamps are essential for authenticity. Always include them in your prompts.</li>
            <li><span className="text-red-400 font-bold">Mistake #5:</span> <strong>Too Much Action.</strong> Real security footage is often boring. The magic is in the mundane moments with occasional interesting activity.</li>
        </ul>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">How to Optimize Your CCTV Prompts for Different AI Platforms</h2>
        <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 border-l-2 border-green-500">
                <h4 className="font-bold text-slate-200">For Runway Gen-3</h4>
                <p className="text-sm text-slate-400">Runway responds well to cinematic terminology combined with technical specs. Lead with the aesthetic: "Grainy security camera footage" then add the scene details.</p>
            </div>
            <div className="bg-gray-900/50 p-4 border-l-2 border-green-500">
                <h4 className="font-bold text-slate-200">For Kling AI</h4>
                <p className="text-sm text-slate-400">Kling excels at longer prompt descriptions. Be verbose with environmental details and specify the exact camera equipment era.</p>
            </div>
            <div className="bg-gray-900/50 p-4 border-l-2 border-green-500">
                <h4 className="font-bold text-slate-200">For Pika Labs</h4>
                <p className="text-sm text-slate-400">Pika works best with shorter, punchy prompts. Focus on the core elements: camera type, location, lighting, and one specific action.</p>
            </div>
             <div className="bg-gray-900/50 p-4 border-l-2 border-green-500">
                <h4 className="font-bold text-slate-200">For Sora (OpenAI)</h4>
                <p className="text-sm text-slate-400">When it becomes available, Sora will likely handle complex scene descriptions. Include narrative elements alongside technical specifications.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">The Business Case for CCTV-Style Content</h2>
        <p>Let me share some data that'll blow your mind:</p>
        <p>Videos tagged with "security camera footage" or "CCTV" on TikTok have generated over 8.7 billion views. On YouTube, true crime channels using surveillance footage aesthetics have seen subscriber growth rates 40% higher than traditional documentary formats.</p>
        <p>For businesses, CCTV-style content works incredibly well for:</p>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Product security demonstrations</li>
            <li>Loss prevention training videos</li>
            <li>Testimonial videos with an authentic feel</li>
            <li>Behind-the-scenes content that feels candid</li>
            <li>Social media content with high shareability</li>
            <li>Film and TV production mockups</li>
        </ul>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">Creating a CCTV Prompt Library for Your Business</h2>
        <p>Here's what I recommend: build a prompt library specific to your niche.</p>
        <p>Create a document with 20-30 variations of CCTV prompts tailored to your industry. Test each one, document what works, and iterate. This library becomes an asset that saves you hours of prompt engineering time and ensures consistent quality across your video projects.</p>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">Tools and Resources for CCTV Prompt Creation</h2>
        <p>To maximize your results, use these complementary tools:</p>
         <ol className="list-decimal list-inside space-y-2 text-slate-300">
            <li><strong>Prompt Enhancers:</strong> Tools that expand your basic prompt into more detailed descriptions</li>
            <li><strong>Style Reference Libraries:</strong> Collections of real CCTV footage to analyze and reference</li>
            <li><strong>Timestamp Generators:</strong> Ensure your timestamps match realistic surveillance patterns</li>
            <li><strong>Camera Specification Guides:</strong> Technical documentation on actual security camera specs</li>
        </ol>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">The Future of CCTV Prompts in AI Video Generation</h2>
        <p>The AI video generation space is evolving rapidly. Here's where I see CCTV prompts heading:</p>
        <p>AI models are getting better at understanding implicit context. Soon, you'll be able to say "convenience store security footage" and the AI will automatically add timestamps, grain, appropriate lighting, and camera angles.</p>
        <p>We're also seeing the emergence of specialized models trained specifically on surveillance footage aesthetics. These will make creating authentic CCTV content even easier.</p>

        <h2 className="text-2xl font-bold text-green-400 mt-8 border-l-4 border-green-500/50 pl-4">Action Steps: Your CCTV Prompt Checklist</h2>
        <p>Ready to start creating? Here's your checklist:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Choose your AI video platform</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Define your scene and location</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Specify camera type and position</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Add visual quality descriptors (grainy, low-res, etc.)</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Include technical overlays (timestamp, camera ID)</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Describe lighting conditions</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Define the action or movement</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Set the atmosphere and mood</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Generate and review</li>
            <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500"/> Iterate based on results</li>
        </ul>

        <div className="mt-10 border-t border-slate-800 pt-6">
            <h3 className="font-bold text-slate-200 mb-2">About This Guide</h3>
            <p className="text-sm text-slate-400">This comprehensive guide to CCTV prompts for AI video generation was created to help content creators, filmmakers, and businesses generate authentic surveillance-style footage using modern AI video tools. Bookmark this page and refer back as you refine your prompt engineering skills.</p>
        </div>
        
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/20 rounded-sm text-center">
             <p className="text-slate-400 text-sm">What CCTV prompt are you going to try first? Test it out and see what results you get.</p>
        </div>
      </div>
    )
  },
  {
    id: '1',
    slug: 'mastering-cctv-prompts-ai-video',
    title: 'Mastering CCTV Prompts for AI Video Generation: A Technical Guide',
    excerpt: 'Learn the exact keywords and camera angles needed to generate hyper-realistic surveillance footage using tools like Sora, Runway, and Midjourney.',
    date: 'October 24, 2024',
    author: 'System Admin',
    category: 'Tutorial',
    readTime: '5 min read',
    keywords: ['CCTV prompts', 'AI video generation', 'surveillance footage', 'Sora prompts', 'Midjourney camera angles'],
    content: (
      <div className="space-y-6">
        <p>
          Creating convincing surveillance footage with AI isn't just about describing a scene; it's about simulating the <em>limitations</em> of the hardware. High-end cinema cameras don't capture the raw, gritty reality of a security feed. To master <strong>CCTV prompts for AI video generation</strong>, you need to think like a security installer, not a director.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">1. The "High-Wall" Perspective</h2>
        <p>
          The most defining characteristic of CCTV footage is the angle. Security cameras are almost always mounted high up, looking down.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-300 border-l-2 border-green-500/30 ml-2">
          <li><strong>Keywords to use:</strong> <code>high-angle shot</code>, <code>ceiling mounted camera</code>, <code>wide-angle security lens</code>, <code>fisheye distortion</code>.</li>
          <li><strong>Avoid:</strong> Eye-level shots, bokeh, shallow depth of field, or cinematic lighting.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">2. Degrading the Quality intentionally</h2>
        <p>
          AI models strive for perfection. You must force them to be imperfect. Real <strong>surveillance footage</strong> is compressed, low-bitrate, and often grainy.
        </p>
        <p>
          Add these modifiers to your prompt to increase realism:
        </p>
        <div className="bg-gray-900 p-4 rounded border border-green-500/20 font-mono text-sm text-green-400">
          "CCTV footage, 480p resolution, heavy compression artifacts, motion blur, low dynamic range, washed out colors"
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">3. The Timestamp Anchor</h2>
        <p>
          Nothing sells the illusion of a security feed like the on-screen display (OSD). Always specify: <code>white monospace timestamp overlay</code> or <code>REC blinking icon</code>. This grounds the image in a specific temporal context, making it feel like evidence rather than art.
        </p>
      </div>
    )
  },
  {
    id: '2',
    slug: 'night-vision-infrared-prompt-engineering',
    title: 'The aesthetic of the Unseen: Night Vision & Infrared Prompt Engineering',
    excerpt: 'Deep dive into creating monochromatic, eerie, and authentic night-vision visuals for horror, thriller, and found-footage projects.',
    date: 'November 02, 2024',
    author: 'Visual Analyst',
    category: 'Style Guide',
    readTime: '4 min read',
    keywords: ['Night vision prompts', 'Infrared AI art', 'monochrome green style', 'found footage prompts'],
    content: (
      <div className="space-y-6">
        <p>
          Darkness is where surveillance cameras often do their most critical work. For <strong>AI artists</strong> and filmmakers working on thriller or horror projects, mastering the look of infrared (IR) illumination is essential.
        </p>

        <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">Understanding IR Mode</h2>
        <p>
          When a camera switches to night mode, it blasts the scene with IR light (invisible to the eye) and removes the IR-cut filter. This results in a very specific monochromatic look—usually greyscale or a digital green tint—and "glowing" eyes (retinal reflection).
        </p>

        <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">Key Prompt Structures</h2>
        <p>
          To replicate this via text-to-video or text-to-image, structure your prompt layers as follows:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-900 p-5 rounded border-l-4 border-green-500">
            <h3 className="font-bold text-white mb-2">The Greyscale Look</h3>
            <p className="text-sm">"Black and white infrared CCTV footage, high contrast, glowing eyes, pitch black background, flashlight beam"</p>
          </div>
          <div className="bg-gray-900 p-5 rounded border-l-4 border-green-500">
            <h3 className="font-bold text-white mb-2">The Phosphor Green Look</h3>
            <p className="text-sm">"Night vision goggle view, grain overlay, blooming highlights, phosphor green tint, noisy footage"</p>
          </div>
        </div>

        <p>
          Combine these visuals with our <strong>CCTV Prompt Generator</strong> settings for "Infrared / Night Vision" to automatically append the correct technical data to your prompt.
        </p>
      </div>
    )
  },
  {
    id: '3',
    slug: 'glitch-art-datamoshing-cctv',
    title: 'Datamoshing and Glitches: Adding Digital Decay to AI Video',
    excerpt: 'How to simulate signal loss, frame skipping, and digital decay to turn pristine AI generations into gritty, realistic found footage.',
    date: 'November 15, 2024',
    author: 'Signal Tracer',
    category: 'Technique',
    readTime: '6 min read',
    keywords: ['Datamosh prompts', 'glitch art AI', 'signal loss effect', 'VHS aesthetic'],
    content: (
      <div className="space-y-6">
        <p>
          Pristine footage is the enemy of realism in the context of security feeds. <strong>Digital decay</strong>—the artifacts that occur when bandwidth drops or a hard drive skips—adds a layer of narrative texture that tells the viewer: "This signal is weak. Something is wrong."
        </p>

        <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">Simulating Transmission Errors</h2>
        <p>
          In prompt engineering, you are describing the <em>medium</em> as much as the subject. Use words that describe digital failure:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li><code>macroblocking</code>: The blocky squares seen in low-bitrate video.</li>
          <li><code>datamosh</code>: The melting effect when I-frames are missing.</li>
          <li><code>signal interference</code>: Horizontal lines or static bands.</li>
          <li><code>chromatic aberration</code>: The separation of color channels at the edges of the lens.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">The Narrative Power of the Glitch</h2>
        <p>
          A well-placed glitch can hide a monster, obscure a face, or transition a scene. In AI video generation tools, prompting for "corrupted file" or "broken video feed" can yield unpredictable, often terrifying results perfect for the "Analog Horror" genre.
        </p>
      </div>
    )
  }
];

// --- Components ---

const BlogCard: React.FC<{ post: BlogPost; onClick: (post: BlogPost) => void }> = ({ post, onClick }) => (
  <article 
    onClick={() => onClick(post)}
    className="group relative flex flex-col bg-gray-900/50 border border-green-400/10 rounded-sm p-6 transition-all duration-300 hover:border-green-400/40 hover:bg-gray-800/50 cursor-pointer h-full"
  >
    <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-500">
      <span className="flex items-center gap-1 text-green-400/80 border border-green-400/20 px-2 py-0.5 rounded-full bg-green-400/5">
        <TagIcon className="w-3 h-3" />
        {post.category}
      </span>
      <span className="flex items-center gap-1">
        <ClockIcon className="w-3 h-3" />
        {post.readTime}
      </span>
    </div>

    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
      {post.title}
    </h3>
    
    <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
      {post.excerpt}
    </p>

    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
        <div className="flex items-center gap-2 text-xs text-slate-500">
             <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <UserIcon className="w-3 h-3" />
             </span>
            <span>{post.author} • {post.date}</span>
        </div>
    </div>
    
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </article>
);

const BlogPostView: React.FC<{ post: BlogPost; onBack: () => void; onNavigateToGenerator: () => void }> = ({ post, onBack, onNavigateToGenerator }) => (
  <article className="max-w-3xl mx-auto animate-fade-in pb-20">
    <button 
        onClick={onBack} 
        className="group mb-8 flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 transition-colors"
    >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Articles
    </button>

    <header className="mb-10 border-b border-slate-800 pb-10">
        <div className="flex flex-wrap gap-3 mb-6">
             <span className="px-3 py-1 text-xs font-mono text-green-400 border border-green-400/30 rounded-full bg-green-900/10">
                {post.category}
             </span>
             <span className="px-3 py-1 text-xs font-mono text-slate-400 border border-slate-700 rounded-full bg-slate-900">
                {post.readTime}
             </span>
             <span className="px-3 py-1 text-xs font-mono text-slate-400 border border-slate-700 rounded-full bg-slate-900">
                {post.date}
             </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
            {post.title}
        </h1>

        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-900/20 border border-green-500/30 flex items-center justify-center text-green-400">
                <span className="font-bold font-mono">{post.author.substring(0,2).toUpperCase()}</span>
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-200">{post.author}</p>
                <p className="text-xs text-slate-500">Contributor</p>
            </div>
        </div>
    </header>

    <div className="prose prose-invert prose-green max-w-none text-slate-300 leading-loose text-lg">
        {post.content}
    </div>

    <div className="mt-16 p-8 bg-gray-900/80 border border-green-500/30 rounded-sm text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
        <h3 className="text-xl font-bold text-white mb-3 relative z-10">Ready to create your own footage?</h3>
        <p className="text-slate-400 mb-6 relative z-10">Apply these techniques instantly with our AI-powered generator.</p>
        <button 
            onClick={onNavigateToGenerator}
            className="relative z-10 px-8 py-3 bg-green-500 text-gray-950 font-bold rounded-sm hover:bg-green-400 transition-all duration-300 shadow-[0_0_15px_rgba(74,222,128,0.3)]"
        >
            Open Generator
        </button>
    </div>
  </article>
);

export const BlogPage: React.FC<PageProps> = ({ onBack, onNavigateToGenerator }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  const blogPosts = getBlogPosts(onNavigateToGenerator);

  if (selectedPost) {
    return (
        <BlogPostView 
            post={selectedPost} 
            onBack={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                setSelectedPost(null);
            }} 
            onNavigateToGenerator={onNavigateToGenerator}
        />
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-8 text-green-400 hover:text-green-300 transition-colors font-bold">[ &lt; Back to Generator ]</button>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 tracking-wide mb-6">
            Surveillance <span className="text-green-400">Logs</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Insights, techniques, and prompt engineering guides for creating hyper-realistic CCTV and security footage with Artificial Intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
        ))}
      </div>
      
      {/* SEO Keywords Section (Visually subtle but present) */}
      <div className="border-t border-slate-800 pt-12 pb-6">
        <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-4 text-center">Trending Topics</p>
        <div className="flex flex-wrap justify-center gap-2">
            {Array.from(new Set(blogPosts.flatMap(p => p.keywords))).map(keyword => (
                <span key={keyword} className="text-xs text-slate-500 bg-gray-900 border border-slate-800 px-2 py-1 rounded-sm">
                    #{keyword.replace(/\s+/g, '')}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};
