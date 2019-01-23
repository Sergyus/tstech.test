<template>
  <div class="element row">

    <div>
      <button type="button" class="btn btn-light">{{ row+1 }}</button>
    </div>

    <div class="col">
      <div class="form-group">
        <select @change="$emit('value', selected, row)" v-model="selected" class="form-control">
          <option disabled value="">Выберите один из вариантов</option>
          <option v-for="option in options" :value="option.name" v-show="!option.used">
            {{ option.title }} - {{ row }} - {{ option.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="col">
      <button @click="$emit('ord')" type="button" class="btn btn-primary">Order</button>
      <button @click="$emit('del')" type="button" class="btn btn-danger">X</button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'SelectItem',
    props: {
      options: Array,
      row: Number
    },
    data () {
      return {
        selected: '',
      }
    },
  }
</script>
