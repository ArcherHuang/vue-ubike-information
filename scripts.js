// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

const vm = new Vue({
  el: '#app',
  data: {
    search: '',
    ubikeStops: []
  },
  mounted() {
    axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
      .then(res => {
        // 將 json 轉陣列後存入 this.ubikeStops
        const ubikeStops = Object.keys(res.data.retVal).map(key => res.data.retVal[key])
        // console.log(ubikeStops)
        this.ubikeStops = ubikeStops
      })
  },
  methods: {
    sort(name) {
      const [field, sort] = name.split("-")
      this.ubikeStops = this.ubikeStops.slice().sort((a, b) => {
        return sort === 'asc' ? +a[field] - +b[field] : +b[field] - +a[field]
      })
    }
  },
  computed: {
    filteredStations() {
      const keyword = this.search
      return this.ubikeStops.filter(s => s.sna.toLowerCase().includes(keyword.toLowerCase()))
    }
  },
  filters: {
    timeFormat(value) {
      return `${value.substr(0, 4)}/${value.substr(4, 2)}/${value.substr(6, 2)} ${value.substr(8, 2)}:${value.substr(10, 2)}:${value.substr(12, 2)}`
    }
  }
})