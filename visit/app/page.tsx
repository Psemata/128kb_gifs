import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type HubItem = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const hubItems: HubItem[] = [
  {
    title: "GIF 01",
    description: "Rotating square animation with p5.js",
    image: "/images/exercise_01.png",
    link: "/gif_01",
  },
];

export default function GIFS() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto py-16 px-5">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 text-balance">
            GIF Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Explore interactive generative art animations. Click any project to
            view and download as GIF.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {hubItems.map((item, index) => (
            <Link href={item.link} key={index} className="no-underline group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200 group-hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center text-indigo-600 text-sm font-medium">
                      <span>View Project</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
