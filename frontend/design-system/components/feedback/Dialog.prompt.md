Modal confirmation — used for delete-spool confirmation.

```jsx
<Dialog open={confirmOpen} title="Delete spool?" onClose={close} footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="danger" onClick={del}>Delete</Button></>}>
  This removes the spool from inventory permanently.
</Dialog>
```
