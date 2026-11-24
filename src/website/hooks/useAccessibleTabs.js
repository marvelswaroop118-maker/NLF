import { useId, useState } from 'react';

export function useAccessibleTabs(prefix, { vertical = false, initial = 0 } = {}) {
  const id = `${prefix}-${useId().replaceAll(':', '')}`;
  const [active, setActive] = useState(initial);
  function tabProps(index, className = '') {
    return {
      id: `${id}-tab-${index}`,
      role: 'tab',
      type: 'button',
      className: `${className} ${active === index ? 'on' : ''}`.trim(),
      'aria-selected': active === index,
      'aria-controls': `${id}-panel-${index}`,
      tabIndex: active === index ? 0 : -1,
      onClick: () => setActive(index),
      onKeyDown: (event) => {
        const tabs = [
          ...event.currentTarget.closest('[role="tablist"]').querySelectorAll('[role="tab"]'),
        ];
        const keys = vertical ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
        let next;
        if (event.key === keys[0]) next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === keys[1]) next = (index + 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        setActive(next);
        tabs[next].focus();
      },
    };
  }
  function panelProps(index, className = '') {
    return {
      id: `${id}-panel-${index}`,
      role: 'tabpanel',
      className: `${className} ${active === index ? 'on' : ''}`.trim(),
      'aria-labelledby': `${id}-tab-${index}`,
      hidden: active !== index,
      tabIndex: 0,
    };
  }
  return { active, setActive, tabProps, panelProps };
}
