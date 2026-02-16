import FaqAccordion from "./FaqAccordion";
import BadalRequestButton from "./BadalRequestButton";
import type { IconType } from "react-icons";
import {
  MdAccessible,
  MdCheck,
  MdDescription,
  MdHistoryEdu,
  MdModeNight,
  MdMosque,
  MdSavings,
  MdSchool,
  MdSentimentDissatisfied,
  MdSupportAgent,
  MdVerifiedUser,
  MdVideocam,
} from "react-icons/md";

export default function BadalServicePage() {
  const steps = [
    {
      number: 1,
      title: "تقديم الطلب",
      description: "تعبئة بيانات المستفيد ونوع النسك (حج أو عمرة).",
    },
    {
      number: 2,
      title: "التحقق والدفع",
      description: "مراجعة الطلب وتأكيد الدفع إلكترونياً بأمان.",
    },
    {
      number: 3,
      title: "تعيين المؤدي",
      description: "اختيار طالب علم مؤهل للقيام بالنسك.",
    },
    {
      number: 4,
      title: "أداء المناسك",
      description: "البدء في المناسك مع توثيق حي بالدعاء.",
    },
    {
      number: 5,
      title: "التوثيق",
      description: "استلام شهادة إتمام ومقاطع الفيديو.",
    },
  ] as const;

  const conditions: readonly {
    Icon: IconType;
    title: string;
    description: string;
  }[] = [
    {
      Icon: MdSentimentDissatisfied,
      title: "المتوفى",
      description:
        "تجوز النيابة في الحج والعمرة عن الميت الذي لم يؤد الفريضة، أو أراد أهله التطوع عنه لزيادة أجره.",
    },
    {
      Icon: MdAccessible,
      title: "العاجز عجزاً دائماً",
      description:
        "المريض مرضاً لا يرجى شفاؤه، أو الكبير في السن الذي لا يستطيع الثبات على الراحلة والسفر.",
    },
    {
      Icon: MdSavings,
      title: "الاستطاعة المالية",
      description:
        "أن يكون الشخص الموكل (طالب الخدمة) قادراً على تحمل نفقات النائب وتوكيله.",
    },
  ];

  const faqs = [
    {
      question: "هل هذه الخدمة جائزة شرعاً؟",
      answer:
        "نعم، تجوز النيابة في الحج والعمرة عن الميت والعاجز عجزاً لا يرجى برؤه، وذلك باتفاق أهل العلم، وقد وردت أحاديث صحيحة تثبت جواز ذلك.",
    },
    {
      question: "كيف أتأكد من أداء النسك؟",
      answer:
        "نقوم بتزويدك بتوثيق مرئي (فيديو) للمؤدي وهو ينطق بالنية باسم صاحب الطلب، بالإضافة إلى مقاطع من الطواف والسعي والدعاء.",
    },
    {
      question: "من هم الذين يؤدون العمرة والحج؟",
      answer:
        "نتعامل مع طلاب علم وحفظة لكتاب الله مقيمين في مكة المكرمة، مشهود لهم بالصلاح والأمانة، وسبق لهم أداء الفريضة عن أنفسهم.",
    },
  ] as const;

  return (
    <main className="flex-grow w-full overflow-x-hidden">
      {/* About & Conditions Section */}
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
                نحن نسهل عليك تأدية هذا النسك عن والديك أو أقاربك ممن تنطبق
                عليهم الشروط الشرعية، ليكون براً بهم ووصلاً لهم.
              </p>

              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <MdSchool
                    className="text-primary mt-1 text-2xl"
                    aria-hidden
                  />
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

      {/* Trust & Transparency Banner */}
      <section className="py-12 bg-secondary/10 dark:bg-secondary/5 border-y border-secondary/10 dark:border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-right">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold text-secondary mb-2">
                ثقة وشفافية مطلقة
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                نلتزم بأعلى معايير المصداقية لضمان طمأنينة قلبك.
              </p>
            </div>

            <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end gap-6 md:gap-12">
              <div className="flex flex-col items-center gap-2">
                <MdVerifiedUser
                  className="text-4xl text-secondary"
                  aria-hidden
                />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  مؤدين ثقات
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MdVideocam className="text-4xl text-secondary" aria-hidden />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  توثيق بالفيديو
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MdDescription
                  className="text-4xl text-secondary"
                  aria-hidden
                />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  شهادة إتمام
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MdSupportAgent
                  className="text-4xl text-secondary"
                  aria-hidden
                />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  دعم مستمر
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 overflow-hidden" id="process">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              كيف نعمل
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              رحلة الخدمة خطوة بخطوة
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center relative hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="w-10 h-10 bg-background-light dark:bg-gray-800 text-gray-500 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 ring-4 ring-white dark:ring-surface-dark border border-gray-300 dark:border-gray-700 transition duration-300 ease-in-out group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-20 bg-background-light dark:bg-background-dark relative"
        id="pricing"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              اختر الباقة المناسبة
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              أسعار شفافة وشاملة لكافة الخدمات
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Umrah Card */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-colors">
              <div className="h-full flex flex-col p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      عمرة البدل
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      أداء كامل لمناسك العمرة
                    </p>
                  </div>
                  <div className="flex bg-primary/10 text-primary p-2 rounded-lg">
                    <MdModeNight className="text-2xl" aria-hidden />
                  </div>
                </div>

                <div className="text-3xl font-bold text-primary mb-6">
                  ٥٠٠{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    ريال سعودي
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <MdCheck className="text-green-500 text-lg" aria-hidden />
                    نية وتلبية بالاسم
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <MdCheck className="text-green-500 text-lg" aria-hidden />
                    طواف وسعي وحلق/تقصير
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <MdCheck className="text-green-500 text-lg" aria-hidden />
                    فيديو للدعاء عند الكعبة
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <MdCheck className="text-green-500 text-lg" aria-hidden />
                    إنجاز خلال ٤٨ ساعة
                  </li>
                </ul>

                <div className="mt-auto">
                  <BadalRequestButton
                    serviceType="umrah"
                    label="طلب عمرة بدل"
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Hajj Card */}
            <div className="bg-surface-dark dark:bg-black rounded-2xl shadow-xl overflow-hidden border border-primary relative">
              <div className="absolute top-0 ltr:left-0 rtl:right-0 bg-primary text-white text-xs px-3 py-1 ltr:rounded-br-lg rtl:rounded-bl-lg font-bold">
                الأكثر طلباً
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">حج البدل</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      فريضة الحج كاملة
                    </p>
                  </div>
                  <div className="flex bg-primary/20 text-primary p-2 rounded-lg">
                    <MdMosque className="text-2xl" aria-hidden />
                  </div>
                </div>

                <div className="text-3xl font-bold text-primary mb-6">
                  ٣٠٠٠{" "}
                  <span className="text-sm text-gray-300 font-normal">
                    ريال سعودي
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <MdCheck className="text-primary text-lg" aria-hidden />
                    حج مفرد أو متمتع
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <MdCheck className="text-primary text-lg" aria-hidden />
                    الوقوف بعرفة والمبيت بمنى
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <MdCheck className="text-primary text-lg" aria-hidden />
                    الهدي (الأضحية)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <MdCheck className="text-primary text-lg" aria-hidden />
                    توثيق شامل لكافة المشاعر
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-200">
                    <MdCheck className="text-primary text-lg" aria-hidden />
                    شهادة حج معتمدة
                  </li>
                </ul>

                <BadalRequestButton
                  serviceType="hajj"
                  label="طلب حج بدل"
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark" id="faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            الأسئلة الشائعة
          </h2>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
