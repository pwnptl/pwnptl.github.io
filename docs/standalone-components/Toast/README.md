# Toast

Temporary notification messages with multiple types and positions.

## Usage

```html
<div id="toast-root"></div>

<script type="module">
  import Toast from './Toast.js';

  const toast = new Toast({ rootSelector: '#toast-root' });

  toast.show({
    message: 'Success!',
    type: 'success',        // info | success | warning | error
    position: 'bottom-center',
    duration: 3000
  });
</script>
```

## Options

- `message` - Text to display
- `type` - Message type (default: `info`)
- `position` - Toast position (default: `bottom-center`)
- `duration` - Auto-hide delay in ms (default: 3000)

## Positions

- `bottom-center`, `bottom-left`, `bottom-right`
- `top-center`, `top-left`, `top-right`

## Methods

- `show(options)` - Display a toast
- `hide()` - Close current toast
