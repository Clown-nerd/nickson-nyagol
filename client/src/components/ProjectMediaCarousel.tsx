/**
 * Terminal Monograph design reminder: media placeholders should read as inspected evidence frames, not generic empty cards.
 */
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Film, ImagePlus, Play, Upload } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type ProjectMediaCarouselProps = {
  projectName: string;
  projectNumber: string;
};

const mediaSlots = [
  { kind: "screenshot", label: "Product overview", file: "Screenshot / PNG, JPG, WebP", detail: "Use the clearest first screen: the primary user task or product command centre." },
  { kind: "detail", label: "Workflow detail", file: "Screenshot / PNG, JPG, WebP", detail: "Show the moment the system removes a decision, handoff, or operational bottleneck." },
  { kind: "video", label: "Product walkthrough", file: "Product clip / MP4, WebM", detail: "A 20–60 second clip works best for an end-to-end action, before-and-after flow, or feature reveal." },
] as const;

const projectProfiles: Record<string, { domain: string; signal: string; marker: string }> = {
  "01": { domain: "SACCO ledger", signal: "contribution → approval", marker: "membership / money flow" },
  "02": { domain: "Student lifecycle", signal: "admission → outcome", marker: "record / role boundary" },
  "03": { domain: "Booking capacity", signal: "selection → confirmation", marker: "time / resource flow" },
  "04": { domain: "Inventory network", signal: "receipt → fulfillment", marker: "stock / exception signal" },
  "05": { domain: "Commerce discovery", signal: "edit → collection", marker: "story / shop path" },
  "06": { domain: "Craft storefront", signal: "texture → product", marker: "feature / collection flow" },
  "07": { domain: "Operational AI", signal: "context → action", marker: "signal / route system" },
};

export default function ProjectMediaCarousel({ projectName, projectNumber }: ProjectMediaCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const profile = projectProfiles[projectNumber] ?? projectProfiles["01"];

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const activeSlot = mediaSlots[activeIndex];

  return (
    <div className="media-carousel" data-project={projectNumber} aria-label={`${projectName} media gallery placeholders`}>
      <div className="media-carousel-bar">
        <p className="mono text-[9px] uppercase tracking-[0.13em] text-[#8d9890]">{profile.domain} / {projectNumber}</p>
        <p className="mono text-[9px] uppercase tracking-[0.13em] text-[#c6ff3f]">{profile.signal}</p>
      </div>

      <Carousel opts={{ loop: true, dragFree: false, skipSnaps: false, containScroll: "trimSnaps" }} setApi={setApi} className="media-carousel-main" aria-label={`${projectName} project media`}>
        <CarouselContent className="-ml-0">
          {mediaSlots.map((slot, index) => (
            <CarouselItem key={slot.kind} className="pl-0">
              <div className={`media-placeholder media-placeholder-${slot.kind}`}>
                <div className="media-placeholder-corner" aria-hidden="true" />
                <div className="media-placeholder-topline" aria-hidden="true"><span>{profile.marker}</span><span>ASSET / 0{index + 1}</span></div>
                {slot.kind === "screenshot" && <div className="media-wireframe media-wireframe-overview" aria-hidden="true"><span /><i /><i /><i /><b /><b /><b /></div>}
                {slot.kind === "detail" && <div className="media-wireframe media-wireframe-detail" aria-hidden="true"><span /><i /><i /><i /><b /><b /></div>}
                {slot.kind === "video" && <div className="media-video-placeholder" aria-hidden="true"><div className="media-play-mark"><Play size={23} fill="currentColor" /></div><div className="media-timeline"><span /></div><p>00:00 / 00:45</p></div>}
                <div className="media-placeholder-copy">
                  <span className="media-type-icon">{slot.kind === "video" ? <Film size={17} /> : <ImagePlus size={17} />}</span>
                  <div><p>{slot.label}</p><span>{slot.file}</span></div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="media-carousel-footer">
        <p className="media-upload-note" aria-live="polite"><Upload size={13} /><span><b>{activeSlot.label}:</b> {activeSlot.detail}</span></p>
        <div className="media-controls">
          <button type="button" className="focus-ring media-arrow" onClick={() => api?.scrollPrev()} aria-label={`Show previous ${projectName} media placeholder`}><ChevronLeft size={16} /></button>
          <div className="media-dots" aria-label={`${projectName} media slides`}>
            {mediaSlots.map((slot, index) => <button key={slot.kind} type="button" className={index === activeIndex ? "is-active" : ""} onClick={() => api?.scrollTo(index)} aria-label={`Show ${slot.label}`} aria-current={index === activeIndex ? "true" : undefined} />)}
          </div>
          <button type="button" className="focus-ring media-arrow" onClick={() => api?.scrollNext()} aria-label={`Show next ${projectName} media placeholder`}><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
