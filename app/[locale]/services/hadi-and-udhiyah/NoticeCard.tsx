import { MdInfo } from "react-icons/md";

type Props = {
  title: string;
  body: string;
};

export default function NoticeCard({ title, body }: Props) {
  return (
    <div className="border border-[var(--color-accent)] rounded-2xl p-6 flex items-start gap-5">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[var(--color-accent)] shrink-0">
        <MdInfo className="text-[var(--color-primary)] text-xl" />
      </div>
      <div>
        <h3 className="font-bold text-sm mb-1 uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-sm text-black/60 font-light leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}
