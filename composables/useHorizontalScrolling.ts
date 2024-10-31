const deltaThresholdMin = 100;
const deltaThresholdMax = 150;

export function useHorizontalScrolling() {
  let initDelta = 0;
  let deltaResetTimeout: null | ReturnType<typeof setTimeout> = null;

  return (e: WheelEvent) => {
    if (Math.abs(e.deltaY) < deltaThresholdMin || deltaThresholdMax < Math.abs(e.deltaY)) return
    
    // Check if horizontal scrolling, do nothing if so
    if (e.deltaX) return
    
    // If initDelta is 0, it means this is the first event
    if (initDelta === 0) {
      e.preventDefault();
      initDelta = Math.abs(e.deltaY);
      return
    }

    // not the first event

    // Clear any existing timeout and set a new one
    if (deltaResetTimeout !== null) clearTimeout(deltaResetTimeout);
    deltaResetTimeout = setTimeout(() => { initDelta = 0 }, 1000);

    // If initDelta is not equal to current deltaY, return
    if (initDelta !== Math.abs(e.deltaY)) return

    // If deltaY is less than deltaThreshold, return

    // If we reach here, we can assume it's a mouse wheel scroll
    const target = e.currentTarget as HTMLElement;
    target.scrollLeft += e.deltaY;
    e.preventDefault();
  };
}
