/* @ds-bundle: {"format":4,"namespace":"FilamentTrackerDesignSystem_5636be","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ColorSwatch","sourcePath":"components/data/ColorSwatch.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"ScanFAB","sourcePath":"components/data/ScanFAB.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"479dc46e3a04","components/core/Button.jsx":"b0dcd28873e0","components/core/Card.jsx":"44d78dbec126","components/core/IconButton.jsx":"2ed879242f29","components/core/Tag.jsx":"ddcab919fa73","components/data/ColorSwatch.jsx":"7c6bd03c71d6","components/data/ProgressBar.jsx":"a95ecab861a1","components/data/ScanFAB.jsx":"3280edb6f49b","components/feedback/Dialog.jsx":"d96c23f2a78c","components/feedback/Toast.jsx":"78e9dc5140fb","components/feedback/Tooltip.jsx":"2d930be9e4b6","components/forms/Checkbox.jsx":"f1fa1b8bb110","components/forms/Input.jsx":"b6b45e8624a2","components/forms/Radio.jsx":"44b6487028f2","components/forms/Select.jsx":"1e9ac6e8f0f2","components/forms/Switch.jsx":"2f716c323dae","components/navigation/Tabs.jsx":"907dca6f5df8","ui_kits/filament-tracker/Dashboard.jsx":"af84c1f77750","ui_kits/filament-tracker/PendingCard.jsx":"467162301082","ui_kits/filament-tracker/ReviewEdit.jsx":"9fbda44be818","ui_kits/filament-tracker/ScanCapture.jsx":"bb3c41c5b3a3","ui_kits/filament-tracker/SpoolCard.jsx":"1416f2d1c88f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FilamentTrackerDesignSystem_5636be = window.FilamentTrackerDesignSystem_5636be || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    bg: 'var(--surface-raised)',
    fg: 'var(--text-secondary)',
    border: 'var(--border-default)'
  },
  success: {
    bg: 'var(--status-success-bg)',
    fg: 'var(--status-success)',
    border: 'var(--status-success)'
  },
  warning: {
    bg: 'var(--status-warning-bg)',
    fg: 'var(--status-warning)',
    border: 'var(--status-warning)'
  },
  error: {
    bg: 'var(--status-error-bg)',
    fg: 'var(--status-error)',
    border: 'var(--status-error)'
  },
  info: {
    bg: 'var(--status-info-bg)',
    fg: 'var(--status-info)',
    border: 'var(--status-info)'
  }
};
function Badge({
  children,
  tone = 'neutral',
  dot = false
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '2px 8px',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-semibold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-mono)'
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    padding: '4px 10px',
    fontSize: 'var(--text-xs)'
  },
  md: {
    padding: '6px 14px',
    fontSize: 'var(--text-sm)'
  },
  lg: {
    padding: '9px 20px',
    fontSize: 'var(--text-base)'
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--accent-primary)',
    color: 'var(--text-on-accent)',
    border: '1px solid var(--accent-primary)'
  },
  secondary: {
    background: 'var(--surface-raised)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent'
  },
  danger: {
    background: 'var(--status-error)',
    color: 'var(--text-on-accent)',
    border: '1px solid var(--status-error)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  type = 'button'
}) {
  const [hover, setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: 'var(--tracking-normal)',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)',
    opacity: disabled ? 0.45 : 1,
    ...s,
    ...v,
    background: hover && !disabled ? 'var(--surface-hover)' : v.background,
    borderColor: hover && !disabled && variant !== 'primary' ? 'var(--border-strong)' : v.border.split(' ').pop(),
    color: hover && !disabled ? '#ffffff' : v.color
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: style,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, iconLeft, /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padded = true,
  interactive = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: `1px solid ${interactive && hover ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-md)',
      padding: padded ? 'var(--space-4)' : 0,
      transition: 'border-color var(--duration-fast) var(--ease-standard)',
      cursor: interactive ? 'pointer' : 'default',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-primary)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  children,
  label,
  size = 'md',
  variant = 'ghost',
  onClick,
  disabled = false
}) {
  const [hover, setHover] = React.useState(false);
  const dim = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const bg = variant === 'solid' ? 'var(--accent-primary)' : hover ? 'var(--surface-hover)' : 'transparent';
  const color = variant === 'solid' ? 'var(--text-on-accent)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dim,
      height: dim,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: bg,
      color,
      border: variant === 'outline' ? '1px solid var(--border-default)' : '1px solid transparent',
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-md)',
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove,
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '3px 8px 3px 6px',
      fontSize: 'var(--text-xs)',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-secondary)',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)'
    }
  }, color && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '2px',
      background: color,
      border: '1px solid rgba(255,255,255,0.15)'
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-tertiary)',
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      padding: 0,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/ColorSwatch.jsx
try { (() => {
function ColorSwatch({
  color,
  size = 20,
  label
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      background: color,
      borderRadius: 'var(--radius-sm)',
      border: '1px solid rgba(255,255,255,0.18)',
      flexShrink: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)'
    }
  }, label));
}
Object.assign(__ds_scope, { ColorSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ColorSwatch.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function ProgressBar({
  value,
  max = 100,
  low = false,
  label
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const color = low ? 'var(--status-warning)' : 'var(--accent-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: color,
      transition: 'width var(--duration-base) var(--ease-standard)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/ScanFAB.jsx
try { (() => {
function ScanFAB({
  onClick,
  label = 'Scan'
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'fixed',
      bottom: 24,
      right: 24,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: hover ? 'var(--accent-primary-strong)' : 'var(--accent-primary)',
      color: 'var(--text-on-accent)',
      border: '1px solid var(--accent-primary)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 18px',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-sm)',
      cursor: 'pointer',
      boxShadow: 'var(--glow-accent)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      fontSize: 'var(--text-md)'
    }
  }, "\u25C9"), label);
}
Object.assign(__ds_scope, { ScanFAB });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScanFAB.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  footer
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--surface-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      maxWidth: '92vw',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-overlay)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-3) var(--space-4)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-tertiary)',
      cursor: 'pointer',
      fontSize: 'var(--text-md)'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-sm)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-3) var(--space-4)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-2)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  success: {
    border: 'var(--status-success)',
    icon: '✓'
  },
  error: {
    border: 'var(--status-error)',
    icon: '✕'
  },
  info: {
    border: 'var(--status-info)',
    icon: 'i'
  }
};
function Toast({
  tone = 'info',
  title,
  message,
  onClose
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderLeft: `2px solid ${t.border}`,
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-3) var(--space-4)',
      minWidth: 260,
      fontFamily: 'var(--font-mono)',
      boxShadow: 'var(--shadow-panel)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.border,
      fontWeight: 'var(--weight-bold)'
    }
  }, t.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-tertiary)',
      fontSize: 'var(--text-xs)',
      marginTop: 2
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-tertiary)',
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label,
  side = 'top'
}) {
  const [show, setShow] = React.useState(false);
  const pos = side === 'top' ? {
    bottom: '100%',
    marginBottom: 6
  } : {
    top: '100%',
    marginTop: 6
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      background: 'var(--gray-950)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)',
      padding: '4px 8px',
      fontSize: 'var(--text-2xs)',
      fontFamily: 'var(--font-mono)',
      whiteSpace: 'nowrap',
      zIndex: 20,
      boxShadow: 'var(--shadow-panel)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${checked ? 'var(--accent-primary)' : 'var(--border-default)'}`,
      background: checked ? 'var(--accent-primary)' : 'transparent',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-on-accent)',
      fontSize: '11px'
    }
  }, checked && '✓'), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  prefix,
  error,
  disabled = false
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      fontFamily: 'var(--font-mono)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      background: 'var(--surface-base)',
      border: `1px solid ${error ? 'var(--status-error)' : focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-sm)',
      padding: '7px 10px',
      boxShadow: focus && !error ? 'var(--glow-focus)' : 'none',
      opacity: disabled ? 0.5 : 1
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onChange: onChange,
    style: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      caretColor: 'var(--caret)'
    }
  })), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--status-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  name,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${checked ? 'var(--accent-primary)' : 'var(--border-default)'}`
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--accent-primary)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  value,
  onChange,
  options = [],
  disabled = false
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      fontFamily: 'var(--font-mono)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: 'var(--surface-base)',
      border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-sm)',
      opacity: disabled ? 0.5 : 1,
      boxShadow: focus ? 'var(--glow-focus)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      padding: '7px 28px 7px 10px'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    style: {
      background: 'var(--surface-card)'
    }
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      color: 'var(--text-tertiary)',
      pointerEvents: 'none',
      fontSize: 'var(--text-xs)'
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 18,
      borderRadius: 'var(--radius-pill)',
      position: 'relative',
      background: checked ? 'var(--accent-primary-dim)' : 'var(--surface-raised)',
      border: `1px solid ${checked ? 'var(--accent-primary)' : 'var(--border-default)'}`,
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 1,
      left: checked ? 17 : 1,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: checked ? 'var(--accent-primary)' : 'var(--gray-400)',
      transition: 'left var(--duration-fast) var(--ease-standard)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-1)',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-mono)'
    }
  }, items.map(it => {
    const isActive = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 4px',
        marginBottom: -1,
        color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)',
        borderBottom: `2px solid ${isActive ? 'var(--accent-primary)' : 'transparent'}`,
        fontSize: 'var(--text-sm)',
        fontWeight: isActive ? 'var(--weight-semibold)' : 'var(--weight-regular)'
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filament-tracker/Dashboard.jsx
try { (() => {
function Dashboard({
  spools,
  pending,
  onOpenSpool,
  onEditSpool,
  onDeleteSpool,
  onOpenPending,
  onScan,
  tab,
  setTab,
  query,
  setQuery
}) {
  const {
    Tabs,
    Input,
    ScanFAB
  } = window.FilamentTrackerDesignSystem_5636be;
  const filtered = spools.filter(s => tab === 'low' ? s.remaining / s.max < 0.2 : true).filter(s => (s.brand + s.material + s.colorName).toLowerCase().includes(query.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto',
      padding: '28px 24px 100px',
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xl)',
      color: 'var(--accent-primary)',
      fontWeight: 'var(--weight-bold)'
    }
  }, "$ filament-tracker"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, spools.length, " spools tracked \xB7 local-only"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginBottom: 16,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: 'all',
      label: 'All'
    }, {
      value: 'low',
      label: 'Low stock'
    }],
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 200,
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "grep brand, material, color\u2026",
    value: query,
    onChange: e => setQuery(e.target.value)
  }))), pending.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      marginBottom: 10
    }
  }, "Pending scans"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, pending.map(p => /*#__PURE__*/React.createElement(PendingCard, {
    key: p.id,
    item: p,
    onOpen: onOpenPending
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      marginBottom: 10
    }
  }, "Inventory"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, filtered.map(s => /*#__PURE__*/React.createElement(SpoolCard, {
    key: s.id,
    spool: s,
    onOpen: onOpenSpool,
    onEdit: onEditSpool,
    onDelete: onDeleteSpool
  })), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-tertiary)',
      fontSize: 'var(--text-sm)'
    }
  }, "No spools match.")), /*#__PURE__*/React.createElement(ScanFAB, {
    onClick: onScan
  }));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-tracker/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filament-tracker/PendingCard.jsx
try { (() => {
function PendingCard({
  item,
  onOpen
}) {
  const {
    Card,
    Badge
  } = window.FilamentTrackerDesignSystem_5636be;
  const ready = item.status === 'ready';
  return /*#__PURE__*/React.createElement(Card, {
    interactive: ready,
    onClick: () => ready && onOpen(item),
    style: {
      width: 220,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      borderStyle: ready ? 'solid' : 'dashed'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 80,
      background: 'repeating-conic-gradient(var(--surface-raised) 0% 25%, var(--surface-hover) 0% 50%) 50% / 16px 16px',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: ready ? 1 : 0.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      fontSize: 'var(--text-2xs)'
    }
  }, "[ label photo ]")), ready ? /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "READY TO REVIEW") : /*#__PURE__*/React.createElement(Badge, {
    tone: "info",
    dot: true
  }, "PROCESSING\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)'
    }
  }, "queued ", item.queuedAt));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-tracker/PendingCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filament-tracker/ReviewEdit.jsx
try { (() => {
function Field({
  label,
  value,
  detected
}) {
  const {
    Input,
    Badge
  } = window.FilamentTrackerDesignSystem_5636be;
  const [v, setV] = React.useState(value || '');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: label,
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: detected ? undefined : '— not detected, enter manually —'
  }), value ? /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "detected") : /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "manual"));
}
function ReviewEdit({
  item,
  onCancel,
  onConfirm
}) {
  const {
    Dialog,
    Select,
    Button
  } = window.FilamentTrackerDesignSystem_5636be;
  if (!item) return null;
  const d = item.extracted || {};
  const isEdit = !!item.editingSpoolId;
  return /*#__PURE__*/React.createElement(Dialog, {
    open: !!item,
    title: isEdit ? 'Edit spool' : 'Review scan',
    onClose: onCancel,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: onCancel
    }, isEdit ? 'Cancel' : 'Discard'), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onConfirm(item)
    }, isEdit ? 'Save changes' : 'Confirm & add to inventory'))
  }, !isEdit && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      flexShrink: 0,
      background: 'repeating-conic-gradient(var(--surface-raised) 0% 25%, var(--surface-hover) 0% 50%) 50% / 12px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-tertiary)',
      fontSize: 9
    }
  }, "[photo]"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      margin: 0
    }
  }, "Fields the model found are prefilled and marked ", /*#__PURE__*/React.createElement("b", null, "detected"), ". Blank fields are marked ", /*#__PURE__*/React.createElement("b", null, "manual"), " \u2014 fill in or leave blank.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Brand",
    value: d.brand,
    detected: !!d.brand
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Material",
    value: d.material || '',
    onChange: () => {},
    options: [{
      value: 'PLA',
      label: 'PLA'
    }, {
      value: 'PETG',
      label: 'PETG'
    }, {
      value: 'ABS',
      label: 'ABS'
    }, {
      value: '',
      label: '— select —'
    }]
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Color name",
    value: d.colorName,
    detected: !!d.colorName
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Weight (g)",
    value: d.weight,
    detected: !!d.weight
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Print temp (\xB0C)",
    value: d.temp,
    detected: !!d.temp
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Print speed (mm/s)",
    value: d.speed,
    detected: !!d.speed
  })));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-tracker/ReviewEdit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filament-tracker/ScanCapture.jsx
try { (() => {
function ScanCapture({
  open,
  onClose,
  onQueue
}) {
  const {
    Dialog,
    Button
  } = window.FilamentTrackerDesignSystem_5636be;
  const [captured, setCaptured] = React.useState(false);
  return /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    title: "Scan spool label",
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      disabled: !captured,
      onClick: () => {
        onQueue();
        setCaptured(false);
      }
    }, "Capture & queue"))
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setCaptured(true),
    style: {
      height: 180,
      border: '1px dashed var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: captured ? 'var(--accent-primary)' : 'var(--text-tertiary)',
      flexDirection: 'column',
      gap: 8,
      background: 'var(--surface-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, captured ? '▣' : '◻'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)'
    }
  }, captured ? 'Photo captured — tap to retake' : 'Tap to open camera')), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      marginTop: 12
    }
  }, "Uploads immediately. Extraction runs in the background \u2014 you'll get a \"ready to review\" card on the dashboard."));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-tracker/ScanCapture.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filament-tracker/SpoolCard.jsx
try { (() => {
function CardMenu({
  onEdit,
  onDelete
}) {
  const {
    IconButton
  } = window.FilamentTrackerDesignSystem_5636be;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Card options",
    size: "sm",
    variant: "ghost",
    onClick: () => setOpen(o => !o)
  }, "\u22EF"), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '110%',
      right: 0,
      minWidth: 120,
      zIndex: 10,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-panel)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      onEdit();
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '8px 12px',
      background: 'transparent',
      border: 'none',
      color: 'var(--text-primary)',
      fontSize: 'var(--text-xs)',
      fontFamily: 'var(--font-mono)',
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-hover)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      onDelete();
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '8px 12px',
      background: 'transparent',
      border: 'none',
      color: 'var(--status-error)',
      fontSize: 'var(--text-xs)',
      fontFamily: 'var(--font-mono)',
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-hover)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, "Delete")));
}
function SpoolCard({
  spool,
  onOpen,
  onEdit,
  onDelete
}) {
  const {
    Card,
    ColorSwatch,
    ProgressBar,
    Badge,
    Dialog,
    Button
  } = window.FilamentTrackerDesignSystem_5636be;
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const low = spool.remaining / spool.max < 0.2;
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    onClick: () => onOpen(spool),
    style: {
      width: 220,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(ColorSwatch, {
    color: spool.hex,
    size: 22
  }), /*#__PURE__*/React.createElement(CardMenu, {
    onEdit: () => onEdit(spool),
    onDelete: () => setConfirmOpen(true)
  })), low && /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    dot: true
  }, "LOW"), /*#__PURE__*/React.createElement(Dialog, {
    open: confirmOpen,
    title: "Delete spool?",
    onClose: e => {
      setConfirmOpen(false);
    },
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirmOpen(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      onClick: () => {
        setConfirmOpen(false);
        onDelete(spool.id);
      }
    }, "Delete"))
  }, /*#__PURE__*/React.createElement("span", {
    onClick: e => e.stopPropagation()
  }, "This removes ", /*#__PURE__*/React.createElement("b", null, spool.brand, " \u2014 ", spool.colorName), " from inventory permanently.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)'
    }
  }, spool.brand), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, spool.material, " \xB7 ", spool.colorName)), /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Remaining",
    value: spool.remaining,
    max: spool.max,
    low: low
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, spool.temp, "\xB0C"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, spool.speed ? spool.speed + ' mm/s' : 'speed: —')));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-tracker/SpoolCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ColorSwatch = __ds_scope.ColorSwatch;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.ScanFAB = __ds_scope.ScanFAB;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
