import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaMosque,
  FaXTwitter,
} from "react-icons/fa6";
import { RiSendPlane2Line } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pb-8 pt-16 dark:border-gray-800 dark:bg-[#1a2e1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <svg
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="150 150 10 170"
                height={52}
                width={200}
              >
                <text className="st0 st-text" transform="translate(320 260.9)">
                  <tspan x="0" y="0" style={{ fontFamily: "BSinaBold" }}>
                    أركان المناسك
                  </tspan>
                </text>
                <g>
                  <path
                    className="st0"
                    d="M39.3,310l2.5-15c.2-1.3.5-2.4.9-3.3.4-1,1-1.8,1.6-2.4.7-.7,1.6-1.2,2.7-1.5s2.4-.5,4-.5,1.5,0,2.3.1c.8,0,1.6.2,2.4.4v.4c0,.4,0,.9,0,1.6,0,.6,0,1.3,0,1.9v18.5h-3v-18.5c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.5.2-3.3.6-.8.4-1.4.9-1.8,1.7s-.7,1.7-.9,2.9l-2.5,15h-3.1ZM42.4,303.1v-2.6h11.3v2.6h-11.3Z"
                  />
                  <path
                    className="st0"
                    d="M61.5,310v-22.6h3v22.6h-3ZM63.3,303.3v-2.8h5.4c1.2,0,2.1-.3,2.9-.8.8-.6,1.4-1.3,1.8-2.2.4-.9.6-1.9.6-2.9,0-1.5-.4-2.6-1.2-3.3-.8-.7-1.9-1.1-3.2-1.1h-6.3v-2.6h6.4c1.5,0,2.8.3,3.9.8,1.1.5,2,1.3,2.6,2.4.6,1,.9,2.3.9,3.8s-.2,2.6-.7,3.7c-.5,1.1-1.1,2-1.9,2.8-.8.7-1.7,1.3-2.7,1.7-1,.4-2.1.6-3.2.6h-5.3ZM74.9,310l-5.9-7.6,3.1-.4,6.3,7.9h0c0,.1-3.5.1-3.5.1Z"
                  />
                  <path
                    className="st0"
                    d="M82.2,310v-22.6h3v22.6h-3ZM87.6,301.3h-3.7v-2.6h3.6c1.1,0,1.9-.3,2.4-.8.6-.5,1-1.1,1.3-1.9l4-8.5h3.1v.3l-4.4,9.1c-.4.8-.8,1.6-1.4,2.2-.6.7-1.2,1.2-2.1,1.6-.8.4-1.8.6-2.9.6ZM91.7,299.3l6.7,10.5v.3h-3.4l-5.7-9.3,2.4-1.5Z"
                  />
                  <path
                    className="st0"
                    d="M101.1,310l2.5-15c.2-1.3.5-2.4.9-3.3.4-1,1-1.8,1.6-2.4.7-.7,1.6-1.2,2.7-1.5s2.4-.5,4-.5,1.5,0,2.3.1c.8,0,1.6.2,2.4.4v.4c0,.4,0,.9,0,1.6,0,.6,0,1.3,0,1.9v18.5h-3v-18.5c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.5.2-3.3.6-.8.4-1.4.9-1.8,1.7s-.7,1.7-.9,2.9l-2.5,15h-3.1ZM104.2,303.1v-2.6h11.3v2.6h-11.3Z"
                  />
                  <path
                    className="st0"
                    d="M123.3,310v-22.6h2.5l13,13.7v4.2l-13.3-14,.8-.3v19h-3ZM137.3,310v-22.6h3v22.6h-3Z"
                  />
                  <path
                    className="st0"
                    d="M146.8,301.4h4.6c0,0,2.4,0,2.4,0h2.4s-.2,2.9-.2,2.9l-4.6-.2h-2.4c0,.1-2.1,0-2.1,0h-2.3v-2.9c0,0,2.2.1,2.2.1Z"
                  />
                  <path
                    className="st0"
                    d="M158.8,310l2.5-15c.2-1.3.5-2.4.9-3.3.4-1,1-1.8,1.6-2.4.7-.7,1.6-1.2,2.7-1.5s2.4-.5,4-.5,1.5,0,2.3.1c.8,0,1.6.2,2.4.4v.4c0,.4,0,.9,0,1.6,0,.6,0,1.3,0,1.9v18.5h-3v-18.5c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.5.2-3.3.6-.8.4-1.4.9-1.8,1.7s-.7,1.7-.9,2.9l-2.5,15h-3.1ZM162,303.1v-2.6h11.3v2.6h-11.3Z"
                  />
                  <path
                    className="st0"
                    d="M181.1,310v-22.6h3v19.9h9.6v2.6h-12.7Z"
                  />
                  <path
                    className="st0"
                    d="M197.8,310v-22.6h2.5l8,12.4h-1.3l8-12.4h2.5v22.6h-3v-17.6l.7.2-6.3,9.7h-2.4l-6.3-9.7.7-.2v17.6h-3Z"
                  />
                  <path
                    className="st0"
                    d="M223.4,310v-22.6h2.5l13,13.7v4.2l-13.3-14,.8-.3v19h-3ZM237.5,310v-22.6h3v22.6h-3Z"
                  />
                  <path
                    className="st0"
                    d="M245,310l2.5-15c.2-1.3.5-2.4.9-3.3.4-1,1-1.8,1.6-2.4.7-.7,1.6-1.2,2.7-1.5,1.1-.3,2.4-.5,4-.5s1.5,0,2.3.1c.8,0,1.6.2,2.4.4v.4c0,.4,0,.9,0,1.6,0,.6,0,1.3,0,1.9v18.5h-3v-18.5c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.5.2-3.3.6-.8.4-1.4.9-1.8,1.7-.4.8-.7,1.7-.9,2.9l-2.5,15h-3.1ZM248.1,303.1v-2.6h11.3v2.6h-11.3Z"
                  />
                  <path
                    className="st0"
                    d="M266.2,306.3h.3c.5.3,1.1.5,1.7.7.6.2,1.3.4,2.1.5.8.1,1.6.2,2.5.2s1.9,0,2.7-.3c.8-.2,1.4-.5,1.8-1,.4-.5.7-1.1.7-2s-.3-1.7-.9-2.2c-.6-.4-1.4-.8-2.6-1l-2.8-.5c-1-.2-2-.5-2.9-1-.9-.5-1.6-1.2-2.1-2.1-.5-.9-.8-2-.8-3.3s.4-3,1.2-4.1c.8-1.1,1.9-1.9,3.3-2.4,1.4-.5,3.1-.8,4.9-.8s1.7,0,2.6.3,1.6.4,2.1.6v2.9h-.3c-.5-.3-1.1-.5-1.9-.7-.8-.2-1.7-.3-2.7-.3s-2.2.1-3.2.4c-1,.3-1.7.8-2.3,1.4s-.8,1.5-.8,2.5.3,2.2,1,2.8c.7.5,1.6.9,2.9,1.1l2.8.5c1.1.2,2,.5,2.8,1,.8.5,1.4,1.1,1.9,1.8.4.8.7,1.7.7,2.8s-.2,1.9-.6,2.7c-.4.8-1,1.4-1.7,1.9s-1.6.9-2.6,1.1c-1,.3-2.1.4-3.4.4s-1.7,0-2.5-.2c-.8-.1-1.5-.2-2.2-.4s-1.3-.4-1.8-.6v-2.9Z"
                  />
                  <path
                    className="st0"
                    d="M285.5,310v-22.6h3v22.6h-3ZM287.3,290.1v-2.6h12.5v2.6h-12.5ZM287.3,299.5v-2.6h10.8v2.6h-10.8ZM287.3,310v-2.6h12.9v2.6h-12.9Z"
                  />
                  <path
                    className="st0"
                    d="M304.8,310v-22.6h3v22.6h-3ZM310.2,301.3h-3.7v-2.6h3.6c1.1,0,1.9-.3,2.4-.8s1-1.1,1.3-1.9l4-8.5h3.1v.3l-4.4,9.1c-.4.8-.8,1.6-1.4,2.2-.6.7-1.2,1.2-2.1,1.6-.8.4-1.8.6-2.9.6ZM314.4,299.3l6.7,10.5v.3h-3.4l-5.7-9.3,2.4-1.5Z"
                  />
                </g>
                <rect
                  className="st0"
                  x="395.3"
                  y="200.8"
                  width="16.4"
                  height="16.4"
                  rx=".8"
                  ry=".8"
                  transform="translate(-29.6 346.5) rotate(-45)"
                />
                <g>
                  <path
                    className="st1"
                    d="M429.5,228.8h-51.5c-2.1,0-3.8,1.7-3.8,3.8v24.9c0,2.1,1.7,3.8,3.8,3.8h19c1.8,0,3.3,1.5,3.3,3.3h0c0,1.8-1.5,3.3-3.3,3.3h-25.4c-2.1,0-3.9-1.7-3.9-3.9v-31.9c0-1.8-1.5-3.3-3.3-3.3h-6.5c-1.8,0-3.3,1.5-3.3,3.3v45c0,2.1,1.7,3.9,3.9,3.9h51.5c1.8,0,3.3-1.5,3.3-3.3v-26c0-1.8-1.5-3.3-3.3-3.3h-19.5c-1.8,0-3.3-1.5-3.3-3.3h0c0-1.8,1.5-3.3,3.3-3.3h39.1c1.8,0,3.3-1.5,3.3-3.3v-6.5c0-1.8-1.5-3.3-3.3-3.3Z"
                  />
                  <rect
                    className="st1"
                    x="439.2"
                    y="228.8"
                    width="13"
                    height="71.6"
                    rx="3.3"
                    ry="3.3"
                  />
                  <path
                    className="st1"
                    d="M429.5,248.3h-6.5c-1.8,0-3.3,1.5-3.3,3.3v32.6c0,1.8-1.4,3.2-3.2,3.2h-13c-1.8,0-3.3,1.5-3.3,3.3v6.5c0,1.8,1.5,3.3,3.3,3.3h22.8c3.6,0,6.5-2.9,6.5-6.5v-42.3c0-1.8-1.5-3.3-3.3-3.3Z"
                  />
                </g>
                <g>
                  <path
                    className="st0"
                    d="M450.3,216.6c-2.4-10.9-12.2-18-21.7-24.9-11.2-8.1-21.7-15.8-22.4-29.3,0-.2,0-.4,0-.6,0-.2,0-.5,0-.7,0-1.5-1.2-2.7-2.7-2.7h0c-1.5,0-2.7,1.2-2.7,2.7h0c0,.4,0,.9,0,1.3-.6,13.5-11.2,21.1-22.4,29.3-9.5,6.9-19.3,14-21.7,24.9-7.2,1.1-12.7,7.4-12.7,14.9v77.2c0,1.9,1.6,3.3,3.5,3.1l2-.2s0,0,0,0v-80.1c0-5.3,4.3-9.6,9.6-9.6s2.6-1,2.7-2.4c1.2-9.8,10.3-16.4,19.9-23.4,8.3-6,17.4-12.7,21.9-22.3,4.5,9.6,13.6,16.2,21.9,22.3,9.6,7,18.6,13.5,19.9,23.4.2,1.4,1.3,2.4,2.7,2.4,5.3,0,9.6,4.3,9.6,9.6v80.1s4.5.5,4.5.5c.5,0,1-.3,1-.8v-79.8c0-7.5-5.5-13.8-12.7-14.9Z"
                  />
                  <rect
                    className="st0"
                    x="343.9"
                    y="307.5"
                    width="119.1"
                    height="4.8"
                    rx=".6"
                    ry=".6"
                  />
                </g>
              </svg>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              منصتكم الأولى لخدمات الحج والعمرة. نسعى لتقديم تجربة روحانية
              متكاملة وميسرة لضيوف الرحمن من جميع أنحاء العالم.
            </p>

            <div className="flex gap-4">
              <a
                className="text-gray-400 transition-colors hover:text-secondary"
                href="#"
                aria-label="X"
              >
                <FaXTwitter className="text-xl" />
              </a>
              <a
                className="text-gray-400 transition-colors hover:text-secondary"
                href="#"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                className="text-gray-400 transition-colors hover:text-secondary"
                href="#"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-[#111811] dark:text-white">
              روابط سريعة
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  عن الشركة
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  الخدمات والمنتجات
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  المدونة الإسلامية
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-[#111811] dark:text-white">
              الدعم والمساعدة
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  مركز المساعدة
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  تتبع الطلب
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-[#111811] dark:text-white">
              اشترك في النشرة
            </h4>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              احصل على آخر العروض والنصائح لرحلتك.
            </p>

            <form
              className="flex gap-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-secondary focus:outline-none dark:border-gray-700 dark:bg-[#233523]"
                placeholder="بريدك الإلكتروني"
                type="email"
                inputMode="email"
                autoComplete="email"
              />
              <button
                type="submit"
                className="rounded-lg bg-secondary px-4 py-2 text-white transition-colors hover:bg-[#109e10]"
                aria-label="إرسال"
              >
                <RiSendPlane2Line className="text-lg" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center dark:border-gray-800">
          <p className="text-sm text-gray-400">
            © 2026 مناسك الحج. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
