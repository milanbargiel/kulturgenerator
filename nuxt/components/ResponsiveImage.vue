<template>
  <img
    :data-src="lazySrc"
    :data-srcset="lazySrcset"
    class="lozad"
    :style="style"
  />
</template>

<script>
export default {
  name: 'AppImage',
  props: {
    lazySrc: {
      type: String,
      default: null,
    },
    lazySrcset: {
      type: String,
      default: null,
    },
    aspectRatio: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    style() {
      // The background color is used as a
      // placeholder while loading the image.
      const style = { backgroundColor: '#fff' }

      // If the image is still loading, we
      // apply the calculated aspect ratio by
      // using padding top.
      const applyAspectRatio = this.loading && this.aspectRatio

      if (applyAspectRatio) {
        // Prevent flash of unstyled image
        // after the image is loaded.
        style.height = 0
        // Scale the image container according
        // to the aspect ratio.
        style.paddingTop = `${this.aspectRatio}%`
      }

      return style
    },
  },
  mounted() {
    // As soon as the <img> element triggers
    // the `load` event, the loading state is
    // set to `false`, which removes the apsect
    // ratio we've applied earlier.
    const setLoadingState = () => {
      this.loading = false
    }

    this.$el.addEventListener('load', setLoadingState)

    // We remove the event listener as soon as
    // the component is destroyed to prevent
    // potential memory leaks.
    this.$once('hook:destroyed', () => {
      this.$el.removeEventListener('load', setLoadingState)
    })

    // We initialize Lozad.js on the root
    // element of our component.
    // const observer = this.lozad(this.$el)
    // observer.observe()
    this.$lozad.observe()
  },
}
</script>
