<template>
  <div class="container">

    <SelectItem v-for="(select, inx) in selects"
                :options="options"
                :key="select.id"
                :row="inx"
                @value="listenEvent"
                @ord="ordProp(inx)"
                @del="delProp(inx)"
    ></SelectItem>

    <br>
    <button @click="addProp" type="button" class="btn btn-success" v-show="checkBtnAdd()">+ Add Property</button>
    <button @click="submitProp" type="button" class="btn btn-primary" v-show="checkBtnSubmit()">Sort</button>

    <br>
    <hr>
    <div class="row">
      <div class="col">
        <pre>options: {{ options }}</pre>
      </div>
      <div class="col">
        <pre>selects: {{ selects }}</pre>
      </div>
      <div class="col">
        <pre>submit: {{ submitArr }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '../api/api'
  import SelectItem from '../components/SelectItem'

  const ASC = 'ASC'
  const DESC = 'DESC'
  const NAME = 'name'
  const TITLE = 'title'
  const PRIORITY = 'priority'
  const ORDER = 'orderTypeDefault'

  export default {
    name: 'Home',
    components: {
      SelectItem,
    },
    data () {
      return {
        selects: [],
        options: [],
        id: 0,
        curOption: {},
        submitArr: [], // Example (!)
      }
    },
    watch: {
      selects: function (val) {
        if (val.length) {
          val.forEach((elem, inx) => this.$set(this.selects[inx], PRIORITY, inx++))
        }
      },
    },
    methods: {
      listenEvent (name, row) {
        this.curOption = { name, row }
        this.createProp()
      },
      createProp () {
        let name = this.curOption.name
        let row = this.curOption.row

        this.options.forEach((opt, inx) => {
          if (opt.name === name) {
            this.$set(this.options[inx], 'used', true)
            this.$set(this.options[inx], 'row', this.selects[row].id)
          }
          if (opt.name !== name && this.selects[row].id === opt.row) {
            this.$set(this.options[inx], 'used', false)
            this.$set(this.options[inx], 'row', false)
          }
        })

        let Option = this.options.find(elem => elem.name === name)
        this.$set(this.selects[row], NAME, name)
        this.$set(this.selects[row], TITLE, Option.title)
        this.$set(this.selects[row], ORDER, Option.orderTypeDefault)
      },
      addProp () {
        this.submitArr = []
        this.selects.push({
          id: this.id++
        })
      },
      delProp (sel_inx) {
        let opt_inx = this.options.map(opt => opt.row).indexOf(this.selects[sel_inx].id)

        this.$delete(this.selects, sel_inx)
        this.$set(this.options[opt_inx], 'used', false)
        this.$set(this.options[opt_inx], 'row', false)
        this.curOption = {}
      },
      setCustomVal () {
        this.options.forEach((elem, inx) => {
          this.$set(this.options[inx], 'used', false)
          this.$set(this.options[inx], 'row', false)
        })
      },
      ordProp (inx) {
        switch (this.selects[inx].orderTypeDefault) {
          case DESC:
            this.$set(this.selects[inx], ORDER, ASC)
            break
          case ASC:
            this.$set(this.selects[inx], ORDER, DESC)
            break
        }
      },
      checkBtnAdd () {
        return !this.options.every(elem => elem.used === true)
      },
      checkBtnSubmit () {
        return this.selects.some(elem => elem.name)
      },
      prepareDataSubmit (selects) {
        this.setCustomVal()
        return selects.filter((elem, inx, arr) => {
          if (elem.name) {
            return delete arr[inx].id
          }
        })
      },
      async submitProp () {
        this.submitArr = this.prepareDataSubmit(this.selects)
        this.selects = []
        // try {
        //   await api.sendData(data => {
        //     console.log(data);
        //   }, this.selects)
        // } catch (err) {
        //   console.log(err)
        // }
      }
    },
    async mounted () {
      try {
        await api.getData(data => {
          this.options = data
          this.setCustomVal()
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
</script>
