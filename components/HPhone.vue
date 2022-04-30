<template>
  <div class="widget">
    <n-input :placeholder="placeholder" :value="value">
      <div slot="left">
        <i class="fi fi-sr-phone-call"></i>
      </div>
      <input ref="input" v-model="ext" type="tel" :required="props.required" />
      <n-dropper slot="right" ref="dropper" class="button">
        <div slot="button" class="index">
          <div
            v-if="current_country"
            class="flag"
            style="width: 20px"
            v-html="current_country.flag"
          ></div>
        </div>
        <div>
          <div
            v-for="(country, c) in countries"
            :key="c"
            class="country"
            @click="select(country.dialCode)"
          >
            <div class="code">{{ country.dialCode }}</div>
            <div class="flag" v-html="country.flag"></div>
            <div>
              {{ country.country }}
            </div>
          </div>
        </div>
      </n-dropper>
    </n-input>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import * as libphonenumber from "libphonenumber-js";
import * as country_list from "country-list";
import * as countryl from "country-flags-dial-code";

@Component
export default class extends Vue {
  @Prop() value!: string;

  @Prop({ type: String }) placeholder!: string;
  @Prop({ type: Object, default: () => ({}) }) props!: { required?: boolean };

  code = "+221";
  ext = "";
  current_country: any = {};

  get countries() {
    const c = countryl.getCountryListMap();
    return c as {
      [key: string]: {
        code: string;
        country: string;
        dialCode: string;
        flag: string;
      };
    };
  }

  get_name(code: string) {
    return country_list.getName(code);
  }

  get_code(code: string) {
    return libphonenumber.getPhoneCode(code as any);
  }

  mounted() {
    this.init();
  }

  @Watch("value")
  init() {
    if (this.value) {
      const f = libphonenumber.formatIncompletePhoneNumber(this.value);
      this.code = f.split(" ")[0];
      this.ext = f;
    } else {
      this.ext = "";
      this.code = "+221";
    }

    let country = Object.values(this.countries).filter(
      (cn) => cn.dialCode === this.code
    )[0];

    if (!country) {
      country = Object.values(this.countries).filter(
        (cn) => cn.dialCode === "+221"
      )[0];
      this.ext = "+221";
      return;
    }

    this.current_country = country;
  }

  @Watch("ext")
  on_change() {
    this.$emit("input", this.ext);
  }

  select(code: string) {
    this.code = code;
    const dropper = this.$refs.dropper as any;
    dropper.closer();

    let v = "";
    if (this.value) v = this.value.split(" ").slice(1).join("");

    this.$emit("input", code + v);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.button {
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
  // width: 100px;

  .index {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 18px;
      margin-right: 5px;
    }
  }
}

.country {
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  padding: 10px;
  cursor: pointer;

  .code {
    width: 40px;
    text-align: right;
    margin-right: 10px;
  }

  .flag {
    width: 22px;
    margin-right: 10px;
  }

  &:hover {
    background-color: rgba(var(--surface), 1);
  }
}
</style>
