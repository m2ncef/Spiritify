import { useEffect, useRef, useState } from "react";
import { Tab, Card, CardContent, List, ListItem, Sheet, BlockHeader, Block,PageContent } from "framework7-react";

export default () => {
  const isMounted = useRef(true);
  const [data, setData] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const closeSheet = () => {
    setIsSheetOpen(false);
    document.querySelector("#sheetDhikr").innerHTML = ""
    document.querySelector("#bless").innerHTML = ""
    document.querySelector("#dhikrRepeat").innerHTML = ""
  };
  function fetchAdhkar(url){
    setIsSheetOpen(true)
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
      document.querySelector("#sheetDhikr").innerHTML = `${res.title} <br><br>` + res.content[Math.floor(Math.random()*13)].zekr
      document.querySelector("#bless").innerHTML = res.content[Math.floor(Math.random()*13)].bless
      document.querySelector("#dhikrRepeat").innerHTML = `Repeat it ${res.content[Math.floor(Math.random()*13)].repeat} time(s)`
    })
  }
  useEffect(() => {
    if (isMounted.current) {
      fetch('https://ahegazy.github.io/muslimKit/json/list.json')
        .then(res => res.json())
        .then(res => {
          const newData = res.map(element => ({
            type: element.title,
            link: element.url
          }));
          setData(newData);
        });
    }
  }, []);
  return (
    <Tab id="adhkar">
          <List simpleList strongIos dividersIos insetIos id='list'>
            {data.map((item, index) => (
              <ListItem key={index} onClick={()=>{
                fetchAdhkar(item.link)
              }}>{item.type}</ListItem>
            ))}
          </List>
        <Sheet push backdrop style={{ height: 'auto', textAlign: 'center', direction: 'rtl' }} opened={isSheetOpen} onSheetClosed={closeSheet}>
          <PageContent>
            <Block>
              <h3 id='sheetDhikr'></h3>
              <BlockHeader><font id='bless'></font></BlockHeader>
              <p id="dhikrRepeat"></p>
            </Block>
          </PageContent>
        </Sheet>
    </Tab>
  );
}
