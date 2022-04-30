import { Vue, Component } from "vue-property-decorator";

@Component
export class Base extends Vue {
  $attr = "";

  mounted() {
    this.$attr = this.$nuxt.context.$utils.token.generate({ length: 8 });
    this.$attr = `data-md-${this.$attr}`;
    this.$el.setAttribute(this.$attr, "");
  }
}
