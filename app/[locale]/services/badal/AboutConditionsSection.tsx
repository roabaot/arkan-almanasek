import { MdHistoryEdu, MdSchool } from "react-icons/md";

import { conditions } from "./badalContent";

export default function AboutConditionsSection() {
  return (
    <section className="py-20 bg-surface-light dark:bg-surface-dark relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* About Text */}
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white relative pb-4 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-16 after:h-1 after:bg-primary after:rounded-full">
              لمن تجوز هذه الخدمة؟
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              شرع الإسلام الحج والعمرة عن الغير في حالات محددة رحمةً بالعباد.
              نحن نسهل عليك تأدية هذا النسك عن والديك أو أقاربك ممن تنطبق عليهم
              الشروط الشرعية، ليكون براً بهم ووصلاً لهم.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <MdSchool className="text-primary mt-1 text-2xl" aria-hidden />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    إشراف شرعي
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    نضمن أهلية القائم بالنسك وعلمه بالمناسك.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MdHistoryEdu
                  className="text-primary mt-1 text-2xl"
                  aria-hidden
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    بدل عن المتوفي
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    أداء الحج أو العمرة عن المتوفي بنية خالصة.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Conditions Grid */}
          <div className="lg:w-2/3 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition) => (
              <div
                key={condition.title}
                className="bg-background-light dark:bg-background-dark h-fit p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <condition.Icon className="text-2xl" aria-hidden />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {condition.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {condition.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
