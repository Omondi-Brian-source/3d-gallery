import { ArrowUp, ArrowDown, Move, Hand } from 'lucide-react';

const ControlsHint = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 controls-hint rounded-xl px-6 py-4">
      {/* Desktop Controls */}
      <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
        {/* Movement Controls */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded border border-border bg-secondary flex items-center justify-center text-xs font-mono font-bold text-foreground">
              W
            </div>
            <div className="flex gap-1">
              <div className="w-7 h-7 rounded border border-border bg-secondary flex items-center justify-center text-xs font-mono font-bold text-foreground">
                A
              </div>
              <div className="w-7 h-7 rounded border border-border bg-secondary flex items-center justify-center text-xs font-mono font-bold text-foreground">
                S
              </div>
              <div className="w-7 h-7 rounded border border-border bg-secondary flex items-center justify-center text-xs font-mono font-bold text-foreground">
                D
              </div>
            </div>
          </div>
          <span className="text-xs">
            <span className="block">Walk around</span>
            <span className="block text-muted-foreground/60">or arrow keys</span>
          </span>
        </div>

        <div className="w-px h-10 bg-border" />

        {/* Scroll Control */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-0.5">
            <ArrowUp className="w-3 h-3 text-foreground" />
            <div className="w-5 h-8 rounded-full border-2 border-border flex flex-col items-center justify-start pt-1">
              <div className="w-1 h-2 rounded-full bg-foreground animate-bounce" />
            </div>
            <ArrowDown className="w-3 h-3 text-foreground" />
          </div>
          <span className="text-xs">Scroll to<br/>move forward</span>
        </div>

        <div className="w-px h-10 bg-border" />

        {/* Click hint */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-7 rounded border border-border bg-secondary flex items-center justify-center">
            <div className="w-1.5 h-2.5 rounded-sm border border-foreground/50" />
          </div>
          <span className="text-xs">Click product<br/>for details</span>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="flex md:hidden items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Move className="w-5 h-5 text-foreground" />
          <span className="text-xs">Swipe to<br/>navigate</span>
        </div>

        <div className="w-px h-8 bg-border" />

        <div className="flex items-center gap-2">
          <Hand className="w-5 h-5 text-foreground" />
          <span className="text-xs">Tap product<br/>for details</span>
        </div>
      </div>
    </div>
  );
};

export default ControlsHint;
