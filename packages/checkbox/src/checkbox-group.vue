<script>
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElCheckboxGroup',

    componentName: 'ElCheckboxGroup',

    mixins: [Emitter],

    props: {
      value: {}
    },

    watch: {
      value(value) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="el-checkbox-group">
    <slot></slot>
  </div>
</template>
