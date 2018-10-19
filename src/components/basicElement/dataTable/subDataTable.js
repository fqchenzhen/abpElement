const PAGE_SIZE = 10;
const PAGE_SIZE_ARRAY = [10, 50, 100, 150];

var subDataTable = {
  props: {
    cols: {
      type: Array,
      default: function () {
        return []
      }
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    elementCols() {
      return this.cols.map(c => {
        if (!c.minWidth) {
          c.showOverflowTooltip = true;
        }
        return c;
      });
    }
  }
}

export {
  subDataTable
}
