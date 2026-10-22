import React, { useState } from 'react';
import { AccessoriesState } from '../types/configurator';

interface AdjustAccessoriesDrawerProps {
  isOpen: boolean;
  accessories: AccessoriesState;
  onClose: () => void;
  onApply: (newAcc: AccessoriesState) => void;
}

export const AdjustAccessoriesDrawer: React.FC<AdjustAccessoriesDrawerProps> = ({
  isOpen,
  accessories,
  onClose,
  onApply
}) => {
  const [cableLength, setCableLength] = useState<'60ft' | '100ft' | '150ft'>(accessories.cableLength);
  const [jboxCount, setJboxCount] = useState<number>(accessories.junctionBoxesCount);
  const [conduitEnabled, setConduitEnabled] = useState<boolean>(accessories.conduitAdaptersEnabled);

  if (!isOpen) return null;

  const handleApply = () => {
    const cablePrice = cableLength === '150ft' ? 40 : 0;
    onApply({
      cableLength,
      cablePrice,
      junctionBoxesCount: jboxCount,
      junctionBoxUnitPrice: 19,
      conduitAdaptersEnabled: conduitEnabled,
      conduitPrice: 24
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-surface-panel border border-border-hairline rounded-2xl shadow-2xl p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-hairline">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-brand-gold">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-text-primary">
                Adjust Installation Accessories
              </h3>
              <p className="text-[12px] text-text-muted">
                Fine-tune cable lengths and exterior protective junction hardware.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Option 1: Cable Length Selector */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Ethernet Cat6 Run Length (All Camera Runs)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: '60ft', label: '60 ft', sub: 'Compact layout', price: 'Included ($0)' },
              { val: '100ft', label: '100 ft', sub: 'Architectural Standard', price: 'Included ($0)' },
              { val: '150ft', label: '150 ft', sub: 'Large compound', price: '+$40' }
            ].map((opt) => (
              <label
                key={opt.val}
                onClick={() => setCableLength(opt.val as any)}
                className={`p-3 rounded-xl cursor-pointer flex flex-col items-center gap-1 transition-all ${
                  cableLength === opt.val
                    ? 'bg-surface-container border-2 border-brand-gold shadow-sm'
                    : 'bg-surface-container-low border border-border-hairline hover:border-brand-gold/60'
                }`}
              >
                <input
                  type="radio"
                  name="opt-cable-len"
                  value={opt.val}
                  checked={cableLength === opt.val}
                  onChange={() => {}}
                  className="sr-only"
                />
                <span className="text-[13px] font-semibold text-text-primary">{opt.label}</span>
                <span className="text-[11px] text-text-muted">{opt.sub}</span>
                <span
                  className={`font-mono text-[11px] font-medium ${
                    opt.price.includes('Included') ? 'text-emerald-400' : 'text-brand-gold'
                  }`}
                >
                  {opt.price}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Option 2: Junction Box Quantity */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border-hairline">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Outdoor Junction Boxes (LY-DP54)
              </span>
              <p className="text-[12px] text-text-muted">
                Provisioned for exposed perimeter surface mounts ($19/unit).
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-surface-container-lowest border border-border-hairline rounded-lg p-1">
              <button
                type="button"
                onClick={() => setJboxCount(Math.max(0, jboxCount - 1))}
                className="w-7 h-7 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-text-primary font-mono text-base cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-mono text-sm font-semibold text-brand-gold">
                {jboxCount}
              </span>
              <button
                type="button"
                onClick={() => setJboxCount(Math.min(16, jboxCount + 1))}
                className="w-7 h-7 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-text-primary font-mono text-base cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Option 3: Optional Conduit Adapters */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-border-hairline">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-text-primary">
              3/4" EMT Conduit Adapters (Pack of 4)
            </span>
            <span className="text-[11px] text-text-muted">
              For industrial surface conduit pipe threading.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] text-text-muted">+$24</span>
            <input
              type="checkbox"
              checked={conduitEnabled}
              onChange={(e) => setConduitEnabled(e.target.checked)}
              className="w-4 h-4 rounded bg-surface-container border-border-hairline text-brand-gold focus:ring-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-hairline">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-text-muted hover:text-text-primary text-[13px] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-brand-gold text-white font-semibold text-[13px] shadow-lg hover:brightness-110 transition-all cursor-pointer active:scale-95"
          >
            Apply & Recalculate
          </button>
        </div>
      </div>
    </div>
  );
};
