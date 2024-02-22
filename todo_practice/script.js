const nowDate = document.getElementById("nowDate");
const yearMon = document.getElementById("yearMon");
const allMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
const backgroundImagePath = [
    "./background_image/pexels-photo-15061262.jpg"
]

const get_backgroundImagePath = () => {
    fetch('./background_image_path.json')  //背景網址
    .then(response => {
        const data = response.json()
        return data;
    })
    .then(data => {
        const {imageUrls} = data;
        backgroundImagePath.push(...imageUrls);
    })
    .catch(error=> {
        console.log("error: ", error);
    });
}

const update_time_and_background = () => {
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const set_background_change_time = 60;  //設定背景變換的秒數
    let change_background_timer = 0;  //計時器
    let background_Image_index = 0;

    yearMon.textContent = `${allMonth[month]} ${date}, ${year}`

    //更新時鐘
    setInterval(() => {
        const update_time_per_second = () => {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();
            let timeSet = ``;

            timeSet = hour < 10 ? `0${hour}:` : `${hour}:`;
            timeSet += minute < 10 ? `0${minute}:` : `${minute}:`;
            timeSet += second < 10 ? `0${second}` : `${second}`;
            
            nowDate.textContent = timeSet;
        }

        const update_background_per_ten_second = () => {
            ++change_background_timer % set_background_change_time ? 
            null : 
            (
                change_background_timer = 0,
                ++background_Image_index
            );
                
            background_Image_index %= backgroundImagePath.length;
            document.body.style.backgroundImage = `url(${backgroundImagePath[background_Image_index]})`;
        }

        update_time_per_second();
        update_background_per_ten_second();

    }, 1000);
}

get_backgroundImagePath();
update_time_and_background();

const a = document.getElementById("a");
a.addEventListener("click", () => {
    alert("dkls");
})
