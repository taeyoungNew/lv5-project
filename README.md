# today-weather
# 주소를 검색 및 클릭하여 최신 날씨와 대기오염정보를 확인할 수 있는 사이트 
#### 개발기간: 2022.05~2020.08

## Description

#### 지도상 남한의 원하는 지역을 클릭하거나 상단 검색창에 주소를 검색하여 최신 날씨와 대기오염정보를 확인할 수 있다.

#### 지도를 클릭함으로서 검색하는 시간을 단축 시키고자하였다. 

#### 공공데이터포털의 백엔드에서의 응답시간이 때때로 달라지며 데이터를 받는 시간이 느려질수도 있다.

## Development Environment
```
vue: 2.6.14
vuetify: 2.6.6
```

## APIs
### 1. open API KAKAO MAP (homepage: https://apis.map.kakao.com/)
### 2. open API Data Potal (homepage: https://www.data.go.kr/)
  ##### - [기상청_단기예보 조회서비스](https://www.data.go.kr/iim/api/selectAPIAcountView.do)
  ##### - [한국환경공단_에어코리아_대기오염정보](https://www.data.go.kr/iim/api/selectAPIAcountView.do)

## Files

### views
> MainPage.vue 

### compomemts
> AirInfo.vue 대기오염 아이콘 및 치수를 확인하는 컴포넌트
>
> BeforeSearch.vue 주소 검색전 카드
>
> ErrCard.vue 남한이외에 장소를 클릭시 보여지는 에러카드
>
> KakaoMap.vue 카카오맵 컴포넌트
>
> SearchRegion.vue 검색창 컴포넌트
>
> ShortTerm.vue 단기예보 컴포넌트
>
> ShowWeather.vue 초단기실황 컴포넌트 



### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
