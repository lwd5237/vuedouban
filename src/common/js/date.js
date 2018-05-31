export function getWeekDate() {
  let da = new Date();
  let newda = new Date(da.getFullYear(),da.getMonth(),0);
  console.log(newda.getDate());
  let start="";
  let month = "";
  let end = ""
  let endmonth = ""
  if (da.getDate() >= da.getDay() && da.getDay()!= 0) {
    start = da.getDate()-da.getDay()+1;
    month = da.getMonth()+1;
    if (getDays() >= start + 6) {
      end = start + 6;
      endmonth = month;                    
    } else {
      end = start + 6 - getDays();
      endmonth = month+1;   
    }
  } else if (da.getDate() < da.getDay() && da.getDay()!= 0) {       
    start = newda.getDate() - (da.getDay() - da.getDate());
    month = da.getMonth();
    end = da.getDay()+1;
    endmonth = month+1;
  } else if (da.getDay() == 0) {
    if (da.getDate() >= 7) {
      start = da.getDate()-6;
      month = da.getMonth()+1;
      end = da.getDate();
      endmonth = month;
    } else {
      start = newda.getDate() - (7 - da.getDate());
      month = da.getMonth();
      end =da.getDate();
      endmonth = month +1;
    }
  }
  return month + '月' + start + "日-" + endmonth + '月' + end + "日"
}
export function getDays(){
//构造当前日期对象
let date = new Date();
//获取年份
let year = date.getFullYear(); 
//获取当前月份
let mouth = date.getMonth() + 1;
//定义当月的天数；
let days; 
//当月份为二月时，根据闰年还是非闰年判断天数
if(mouth == 2){
        days= year % 4 == 0 ? 29 : 28;     
    }
    else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12){
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days= 31;
    }
    else{
        //其他月份，天数为：30.
        days= 30;  
    }
    //输出天数
    return days;
}