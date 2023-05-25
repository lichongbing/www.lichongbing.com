---
title: Hello World
abbrlink: 16107
date: 2018-09-30 17:25:30
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

```swift 
import SwiftUI
import Intents
import Alamofire
import SwiftyJSON
import Foundation
import Charts
extension CredentialsOrError {
  var isSuccess: Bool {
    switch self {
    case .credentials: return true
    case .error: return false
    }
  }
  var values: (user: String, givenName: String?, familyName: String?, email: String?,identityToken: Data?,authorizationCode: Data?)? {
    switch self {
    case let .credentials(user: user,
                          givenName: givenName,
                          familyName: familyName,
                          email: email,
                          identityToken: identityToken,
                          authorizationCode: authorizationCode
    ): return (user: user,
               givenName: givenName,
               familyName: familyName,
               email: email,
               identityToken: identityToken,
               authorizationCode: authorizationCode
    )
    case .error: return nil
    }
  }
  var error: Error? {
    switch self {
    case .credentials: return nil
    case .error(let error): return error
    }
  }
}

struct ContentView : View {
    @State var credentials: CredentialsOrError?
    @State   private  var index = 0
    let imgs = ["house.circle","timer","timer","clock.arrow.circlepath","clock.arrow.2.circlepath"]
    let tags = ["主页","定时","统计","分析","复盘"]
   

    var weeks: [String] = []
    var  days : [Int] = []
    var  today : Int32 = 20
   
   func startOfThisWeek() -> Date {
       let date = Date()
       let calendar = NSCalendar.current
       let components = calendar.dateComponents(
           Set<Calendar.Component>([.yearForWeekOfYear, .weekOfYear]), from: date)
       let startOfWeek = calendar.date(from: components)!
       return startOfWeek
   }
    
  
    
   //本周结束日期（星期六）
   func endOfThisWeek(returnEndTime:Bool = false) -> Date {
       let calendar = NSCalendar.current
       var components = DateComponents()
       if returnEndTime {
           components.day = 7
           components.second = -1
       } else {
           components.day = 6
       }
        
       let endOfMonth =  calendar.date(byAdding: components, to: startOfThisWeek())!
       return endOfMonth
   }
   
   func getDay(date:Date) -> Int{
       
       //格式化日期时间
       let dateFormatter = DateFormatter()
       //设置时间格式
       dateFormatter.dateFormat = "dd"
       let day =  (dateFormatter.string(from: date) as NSString).intValue
       return Int(day)
   }
   
   func getYear(date:Date) -> Int{
       
       //格式化日期时间
       let dateFormatter = DateFormatter()
       //设置时间格式
       dateFormatter.dateFormat = "YYYY"
       let year =  (dateFormatter.string(from: date) as NSString).intValue
       return Int(year)
   }
   
   func getMonth(date:Date) -> Int{
       
       //格式化日期时间
       let dateFormatter = DateFormatter()
       //设置时间格式
       dateFormatter.dateFormat = "MM"
       let month =  (dateFormatter.string(from: date) as NSString).integerValue
       return month
   }
   
   func daysCount(year: Int, month: Int) -> Int {
       switch month {
       case 1, 3, 5, 7, 8, 10, 12:
           return 31
       case 4, 6, 9, 11:
           return 30
       case 2:
           let isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
           return isLeapYear ? 29 : 28
       default:
           fatalError("非法的月份:\(month)")
       }
   }
   func getweekdays(firstweekday: Int, totaldays: Int) -> [Int] {
       var dayss : [Int] = []
       if(firstweekday<totaldays-7){
       for i in 0...7 { //正序
           dayss.append(firstweekday+i)
       }
           return dayss
       }
       else{
           for i in 0...(totaldays-firstweekday) { //正序
               dayss.append(firstweekday+i)
           }
           
           for i in 0...(7-(totaldays-firstweekday)) { //正序
               dayss.append(1+i)
           }
           return dayss
       }
   }
   
   init(){
       
       var c = Calendar(identifier: .gregorian)
       // 日历本地化
       c.locale = Locale(identifier: "zh_CN")
       // 获取星期标识
       self.weeks =  c.veryShortWeekdaySymbols
       
       let  firstweekdayss  = self.startOfThisWeek()
       let  firstweekday  = self.getDay(date: firstweekdayss)
       let  year  = self.getYear(date: firstweekdayss)
       let  month  = self.getMonth(date: firstweekdayss)
       let  totaldays  = self.daysCount(year: year, month: month)
       self.days = self.getweekdays(firstweekday: firstweekday, totaldays: totaldays)
       let date = Date()
       let dateFormatter = DateFormatter()
       dateFormatter.dateFormat = "dd"
       self.today = (dateFormatter.string(from: date) as NSString).intValue
}

    
  var body: some View {
      
    VStack {
      if $credentials.wrappedValue == nil {
          Text("lyoggl")
          Text("一个时间记录的软件")
        SignInWithAppleButton(credentials: $credentials)
      }
      else if $credentials.wrappedValue!.isSuccess
      {
                      
          TabView(selection: $index){
              ForEach(0..<imgs.count){item in
                  HomeView(index: item,weeks:weeks,days:days,today: today).tabItem{Image(systemName: self.imgs[item])
                      Text(self.tags[item])}
                                                
              }
              
          }
      }
      else {
        Text($credentials.wrappedValue!.error!.localizedDescription).foregroundColor(.red)
      }
    }
  }
}

fileprivate struct HomeView:View{
    var index:Int
    var  weeks: [String]
    var days: [Int]
    var today: Int32
    var body: some View{
        if index==0 {
            SwiftUIView()
        }else if index==1{
            
            CalanderView(weeks: weeks, days: days,today: today)
        }else if index==2{
         
            BarChartUIView(entries: [ BarChartDataEntry(x: 1, y: 1),
                                      BarChartDataEntry(x: 2, y: 1),
                                      BarChartDataEntry(x: 3, y: 1),
                                      BarChartDataEntry(x: 4, y: 1),
                                      BarChartDataEntry(x: 5, y: 1)])
           
        }else if index==3{
            
            PieChartUIView(entries: [ PieChartDataEntry(value: 30),
                                      PieChartDataEntry(value: 60)])
           
        }
    }
}


```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)
