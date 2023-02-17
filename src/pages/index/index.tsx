import { Text, View } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import { Button } from '@gm-mobile/mp'
import store from '../../store/counter'
import './index.less'

function Index() {
  const { bears, increasePopulation, removeAllBears } = store

  return (
      <View className='index'>
        <Button onClick={increasePopulation}>+</Button>
        <Button onClick={removeAllBears}>removeAllBears</Button>
        <Text>{bears}</Text>
      </View>
  )
}

export default observer(Index)
