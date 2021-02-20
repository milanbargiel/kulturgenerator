<template>
    <img :data-src="imgUrl" :data-srcset="srcSet" :style="style">
</template>

<script>
import lozad from 'lozad';

export default {
    name: 'AppImage',
    props: {
        image: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            loading: true,
        }
    },
    methods: {
      imgVariant (breakpoint) {
        const img = this.image
        let url = img.url // unresized image url
        
        // return resized url for breakpoint if present
        for (const format in img.formats) {
          if (format === breakpoint && img.formats[breakpoint]) { 
            url = img.formats[breakpoint].url
          }
        }

        return url
      }
    },
    computed: {
        imgUrl () {
          // Get 'large' variant of image, if existent
          // If not, take the unresized one
          return process.env.VUE_APP_API_BASEURL + this.imgVariant('large')
        },
        srcSet () {
          // Create srcset attribute for responsive images
          const regularImg = `${process.env.VUE_APP_API_BASEURL + this.imgVariant('large')} 1x, `
          const retinaImg = `${process.env.VUE_APP_API_BASEURL + this.imgVariant('x2')} 2x`

          return regularImg + retinaImg
        },
        style() {
            // The background color is used as a
            // placeholder while loading the image.
            const style = { backgroundColor: '#fff' }
            const aspectRatio = (this.image.height / this.image.width) * 100;

            // If the image is still loading, we
            // apply the calculated aspect ratio by
            // using padding top.
            const applyAspectRatio = this.loading && aspectRatio
            
            if (applyAspectRatio) {
                // Prevent flash of unstyled image
                // after the image is loaded.
                style.height = 0;
                // Scale the image container according
                // to the aspect ratio.
                style.paddingTop = `${aspectRatio}%`
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
        };

        this.$el.addEventListener('load', setLoadingState)
        
        // We remove the event listener as soon as
        // the component is destroyed to prevent
        // potential memory leaks.
        this.$once('hook:destroyed', () => {
            this.$el.removeEventListener('load', setLoadingState)
        });

        // We initialize Lozad.js on the root
        // element of our component.
        const observer = lozad(this.$el)
        observer.observe()
    }
}
</script>