Flat single-pixel-row progress meter for "remaining grams". Turns amber when `low`.

```jsx
<ProgressBar label="Remaining" value={180} max={1000} low />
```

Intentional addition — inventory tracker's core metric (remaining spool weight) needs a meter; no source defines one.
