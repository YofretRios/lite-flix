import { useEffect } from 'react';

/**
 * Custom hook to block or allow scrolling on the document body based on the provided flag.
 *
 * @param flag - A boolean value that determines whether scrolling should be blocked or allowed.
 *               If true, scrolling is blocked. If false, scrolling is allowed.
 *
 * @example
 * ```typescript
 * useBlockScrolling(true); // This will block scrolling
 * useBlockScrolling(false); // This will allow scrolling
 * ```
 */
export default function useBlockScrolling(flag: boolean) {
  useEffect(() => {
    if (flag) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [flag]);
}
