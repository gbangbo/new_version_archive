import { Tabs } from "../interface/common";
import { Friend, Photos, UserPost } from "../interface/social-app";

export const socialAppTab: Tabs[] = [
    {
        id: 1,
        title: 'Timeline',
        value: 'timeline'
    },
    {
        id: 2,
        title: 'About',
        value: 'about'
    },
    {
        id: 3,
        title: 'Friends',
        value: 'friends'
    },
    {
        id: 4,
        title: 'Photos',
        value: 'photos'
    },
]

export const myProfile = {
    name: 'ElANA',
    profile: 'assets/images/dashboard-11/user/7.jpg',
    designation: 'General Manager',
    introduction: `<h6 class="mb-1 block">About Me :</h6>
                    <p> Hi, I’m elana, I’m 30 and I work as a web designer for the “Daydreams” Agency in pier 56. </p>
                    <span class="mb-4 d-block">Favorite TV Shows :</span>
                    <p> Breaking Good, RedDevil, People of Interest, The Running Dead,  Found, American Guy. </p>
                    <span class="mb-4 d-block">Favorite Music Bands :</span>
                    <p> Breaking Good, RedDevil, People of Interest, The Running Dead,  Found, American Guy. </p>`,
    message: 4,
    notification: 6,
    total_likes: 890,
    this_week_likes: 35,
    post_image: 'assets/images/social-app/timeline-3.png',
    liked_by: [
        { name: 'Johny Waston', profile: 'assets/images/user/3.jpg' },
        { name: 'Andew Jon', profile: 'assets/images/user/5.jpg' },
        { name: 'ELANA', profile: 'assets/images/user/1.jpg' },
        { name: 'Bucky Barnes', profile: 'assets/images/user/2.jpg' },
        { name: 'Jason Borne', profile: 'assets/images/user/8.jpg' },
        { name: 'Comeren Diaz', profile: 'assets/images/user/11.png' }
    ],
    socialNetworks: [
        { icon: 'fa-brands fa-facebook-f', platform_class: 'fb', platform_name: 'Facebook' },
        { icon: 'fa-brands fa-x-twitter', platform_class: 'twitter mx-2', platform_name: 'twitter' },
        { icon: 'fa-brands fa-dribbble', platform_class: 'dribble', platform_name: 'dribble' }
    ],
    latestPhotos: [
        { image: 'assets/images/social-app/post-1.png' },
        { image: 'assets/images/social-app/post-2.png' },
        { image: 'assets/images/social-app/post-3.png' },
        { image: 'assets/images/social-app/post-4.png' },
        { image: 'assets/images/social-app/post-5.png' },
        { image: 'assets/images/social-app/post-6.png' },
        { image: 'assets/images/social-app/post-7.png' },
        { image: 'assets/images/social-app/post-8.png' },
        { image: 'assets/images/social-app/post-9.png' }
    ],
    hobbiesInterest: [
        {
            id: 1,
            title: 'Hobbies',
            description: 'I like to ride the bike to work, swimming, and working out. I also like reading design magazines, go to museums, and binge watching a good tv show while it’s raining outside.',
        },
        {
            id: 2,
            title: 'Favourite Music Bands / Artists',
            description: 'Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.',
        },
        {
            id: 3,
            title: 'Favourite TV Shows',
            description: 'Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.',
        },
        {
            id: 4,
            title: 'Favourite Books',
            description: 'The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard, Lord of the Wings, Amongst Gods, The Oracle, A Tale of Air and Water.',
        },
        {
            id: 5,
            title: 'Favourite Movies',
            description: 'Idiocratic, The Scarred Wizard and the Fire Crown, Crime Squad Ferrum Man.',
        },
        {
            id: 6,
            title: 'Favourite Writers',
            description: 'Martin T. Georgeston, Jhonathan R. Token, Ivana Rowle, Alexandr Platt, Marcus Roth.',
        },
        {
            id: 7,
            title: 'Favourite Games',
            description: 'The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4, Grand Snatch Auto.',
        },
        {
            id: 8,
            title: 'Other Interests',
            description: 'Swimming, Surfing, Scuba Diving, Anime, Photography, Tattoos, Street Art.',
        }
    ],
    eduction_employment: [
        {
            id: 1,
            title: 'The New College of Design',
            year: '2001 - 2006',
            description: 'Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.'
        },
        {
            id: 2,
            title: 'Digital Design Intern',
            year: '2006-2008',
            description: 'Digital Design Intern for the “Multimedz” agency. Was in charge of the communication with the clients.'
        },
        {
            id: 3,
            title: 'Rembrandt Institute',
            year: '2008',
            description: 'Five months Digital Illustration course. Professor: Leonardo Stagg.'
        },
        {
            id: 4,
            title: 'UI/UX Designer',
            year: '2001 - 2006',
            description: 'Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.'
        },
        {
            id: 5,
            title: 'The Digital College',
            year: '2010',
            description: '6 months intensive Motion Graphics course. After Effects and Premire. Professor: Donatello Urtle'
        },
        {
            id: 6,
            title: 'The New College of Design',
            year: '2008 - 2013',
            description: 'UI/UX Designer for the “Daydreams” agency.'
        }
    ],
    activity_log: [
        {
            icon: 'user-plus',
            activity: 'Posts can be created, edited, or deleted.',
            date: '25 Jan'
        },
        {
            icon: 'thumbs-up',
            activity: 'Engagement metrics for a post, such as shares, comments, or likes.',
            date: '25 Jan'
        },
        {
            icon: 'thumbs-up',
            activity: 'Posts that have been reported or flagged.',
            date: '25 Jan'
        },
        {
            icon: 'user-plus',
            activity: "User profile modifications (such as changing bios, personal information, or profile photos).",
            date: '25 Jan'
        },
        {
            icon: 'user-plus',
            activity: 'If your app allows verified profiles, it will update the verification status.',
            date: '25 Jan'
        },
        {
            icon: 'user-plus',
            activity: 'Friend requests were sent and accepted.',
            date: '25 Jan'
        },
        {
            icon: 'message-square',
            activity: 'The user\'s password was successfully altered.',
            date: '25 December'
        },
        {
            icon: 'message-square',
            activity: "The user looked over the logs of recent activities.",
            date: '25 December'
        },
        {
            icon: 'user-plus',
            activity: 'Alerts about users who have been unfriended or are new connections.',
            date: '25 December'
        },
        {
            icon: 'user-plus',
            activity: 'User enrolled in the group "Developer Team".',
            date: '25 December'
        },
        {
            icon: 'message-square',
            activity: 'Activity logs that the user exported to a CSV file.',
            date: '25 December'
        },
        {
            icon: 'message-square',
            activity: 'The user\'s inactive session ended.',
            date: '25 December'
        },
        {
            icon: 'thumbs-up',
            activity: 'New event that the user added to the calendar.',
            date: '8 September'
        },
        {
            icon: 'message-square',
            activity: "The user changed the location settings to reflect New York.",
            date: '8 September'
        },
        {
            icon: 'message-square',
            activity: 'A new functionality for mobile alerts.',
            date: '8 September'
        },
        {
            icon: 'message-square',
            activity: 'The user\'s inactive session ended.',
            date: '8 September'
        },
        {
            icon: 'message-square',
            activity: 'The phone number has been updated to (555) 123-4567.',
            date: '8 September'
        },
        {
            icon: 'user-plus',
            activity: 'Andew Jon became friends with comeren Diaz.',
            date: '8 September'
        },
        {
            icon: 'thumbs-up',
            activity: 'Participation in group chats, such as entering or exiting a group.',
            date: '6 June'
        },
        {
            icon: 'user-plus',
            activity: 'Messages sent or received (only timestamps and other metadata, not content).',
            date: '6 June'
        },
        {
            icon: 'thumbs-up',
            activity: 'Log of the alerts that users have received.',
            date: '6 June'
        },
        {
            icon: 'user-plus',
            activity: "Records of suggested stuff that was watched.",
            date: '6 June'
        },
        {
            icon: 'user-plus',
            activity: 'Views, comments, and reactions on stories are examples of interaction metrics.',
            date: '6 June'
        },
        {
            icon: 'message-square',
            activity: 'The user disregarded a system alert for a fresh upgrade.',
            date: '6 June'
        }
    ]
}

export const friends: Friend[] = [
    {
        id: 1,
        name: "Bucky Barnes",
        profile: 'assets/images/user/2.png',
        email: "bucky@gmail.com",
        status: "online",
        is_follower: true,
        is_following: false,
        last_activity_time: '20 min',
        user_profile: 'Aliya Steele'
    },
    {
        id: 2,
        name: "Sarah Loren",
        profile: 'assets/images/user/10.jpg',
        email: "sarah@gmail.com",
        status: "busy",
        is_follower: false,
        is_following: true,
    },
    {
        id: 3,
        name: "Jason Borne",
        profile: 'assets/images/user/6.jpg',
        email: "jasonb@gmail.com",
        status: "offline",
        is_follower: true,
        is_following: false,
        last_activity_time: '1 hour',
        user_profile: 'Max Burton'
    },
    {
        id: 4,
        name: "Comeren Diaz",
        profile: 'assets/images/user/8.jpg',
        email: "comere@gmail.com",
        status: "offline",
        is_follower: false,
        is_following: true,
        last_activity_time: '',
        user_profile: ''
    },
    {
        id: 5,
        name: "Andew Jon",
        profile: 'assets/images/user/14.png',
        email: "andrewj@gmail.com",
        status: "online",
        is_follower: true,
        is_following: false,
    },
    {
        id: 6,
        name: "Johny Waston",
        profile: 'assets/images/user/4.jpg',
        email: "johny@gmail.com",
        status: "busy",
        is_follower: false,
        is_following: true,
        last_activity_time: '1 days',
        user_profile: 'Dalary Ayala'
    },
    {
        id: 7,
        name: "Johny William",
        profile: 'assets/images/user/3.png',
        email: "johnyw@gmail.com",
        status: "offline",
        is_follower: true,
        is_following: false,
    },
    {
        id: 8,
        name: "Brock Lee",
        profile: 'assets/images/user/3.jpg',
        email: "brock@gmail.com",
        status: "busy",
        is_follower: false,
        is_following: true,
        last_activity_time: '2 days',
        user_profile: 'Clark Byrd'
    },
    {
        id: 9,
        name: "Gracie Ryan",
        profile: 'assets/images/dashboard-11/user/1.jpg',
        email: "graciew@gmail.com",
        status: "online",
        is_follower: true,
        is_following: false,
    }
]

export const userPost: UserPost[] = [
    {
        id: 1,
        user_name: 'ELANA',
        user_profile: 'assets/images/user/1.jpg',
        post_date: 'January, 12,2024',
        post_image: 'assets/images/social-app/timeline-1.png',
        description: 'She is a certified personal trainer and nutritionist who uses her blog as a place to share cooking ideas, training photos, and inspirational messages for other fitness fans.',
        comment: 10,
        share: 20,
        comments: [
            {
                id: 1,
                user_name: 'ELANA',
                user_profile: 'assets/images/user/1.jpg',
                comment: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
                time: '1 Year'
            },
            {
                id: 2,
                user_name: 'Alexendra Dhadio',
                user_profile: 'assets/images/user/2.png',
                comment: 'yes, really very awesome car i see the features of this car in the official website of #Mercedes-Benz and really impressed :-)',
                time: '1 Month',
                is_reply: true
            },
            {
                id: 3,
                user_name: 'Olivia Jon',
                user_profile: 'assets/images/user/3.png',
                comment: 'i like lexus cars, lexus cars are most beautiful with the awesome features, but this car is really outstanding than lexus',
                time: '15 Days',
                is_reply: true
            },
            {
                id: 4,
                user_name: 'ELANA',
                user_profile: 'assets/images/user/1.jpg',
                comment: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
                time: '1 Year'
            }
        ]
    },
    {
        id: 2,
        user_name: 'ELANA',
        user_profile: 'assets/images/user/1.jpg',
        post_date: 'January, 12,2019',
        post_image: 'assets/images/social-app/timeline-2.png',
        description: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
        comment: 10,
        share: 20,
        comments: [
            {
                id: 1,
                user_name: 'ELANA',
                user_profile: 'assets/images/user/1.jpg',
                comment: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
                time: '1 Year',
            },
            {
                id: 2,
                user_name: 'ELANA',
                user_profile: 'assets/images/user/1.jpg',
                comment: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
                time: '1 Year',
            }
        ]
    }
]

export const photos: Photos[] = [
    {
        id: 1,
        user_name: 'Johan Deo',
        description: 'An admin theme is a visually beautiful and practical design template created especially for a website\'s or application\'s backend.',
        src_url: 'assets/images/lightgallery/01.jpg',
        preview_url: 'assets/images/big-lightgallery/01.jpg',
        likes: '2.4K',
        comment: 575,
    },
    {
        id: 2,
        user_name: 'Dev John',
        description: 'Effectively manage users with our user-friendly dashboard, which includes customisable widgets and real-time data metrics.',
        src_url: 'assets/images/lightgallery/02.jpg',
        preview_url: 'assets/images/big-lightgallery/02.jpg',
        likes: '2.4K',
        comment: 575,
    },
    {
        id: 3,
        user_name: 'Gwen Rice',
        description: 'With just a few clicks, create thorough reports that provide insightful information about your business activities.',
        src_url: 'assets/images/lightgallery/03.jpg',
        preview_url: 'assets/images/big-lightgallery/03.jpg',
        likes: '2.4K',
        comment: 575,
    },
    {
        id: 4,
        user_name: 'Comeren Diaz',
        description: 'With a personalised activity feed that includes posts, images, and updates, you can stay in touch with friends and follow trends.',
        src_url: 'assets/images/lightgallery/04.jpg',
        preview_url: 'assets/images/big-lightgallery/04.jpg',
        likes: '2.4K',
        comment: 575,
    },
    {
        id: 5,
        user_name: 'Leo Macias',
        description: 'Customise your accounts with cover photographs, biographies, and profile pictures to express who you are.',
        src_url: 'assets/images/lightgallery/05.jpg',
        preview_url: 'assets/images/big-lightgallery/05.jpg',
        likes: '2.4K',
        comment: 575,
    },
    {
        id: 6,
        user_name: 'Sarah Loren',
        description: 'Use our built-in live streaming function to go live and share experiences with your followers in real time.',
        src_url: 'assets/images/lightgallery/06.jpg',
        preview_url: 'assets/images/big-lightgallery/06.jpg',
        likes: '2.4K',
        comment: 575,
    },
    {
        id: 7,
        user_name: 'Andew Jon',
        description: 'Gather and handle user reviews straight from the administrative dashboard to ensure ongoing development.',
        src_url: 'assets/images/lightgallery/07.jpg',
        preview_url: 'assets/images/big-lightgallery/07.jpg',
        likes: '2.4K',
        comment: 575,
    },
    {
        id: 7,
        user_name: 'Bucky Barnes',
        description: 'With scheduled backup and simple restore options for important data, you can guarantee data security.',
        src_url: 'assets/images/lightgallery/08.jpg',
        preview_url: 'assets/images/big-lightgallery/08.jpg',
        likes: '2.4K',
        comment: 575,
    }
]

export const socialAppLeftPanelAccordion: Tabs[] = [
    {
        id: 1,
        title: 'My Profile',
        value: 'my_profile'
    },
    {
        id: 2,
        title: 'Mutual Friends',
        value: 'mutual_friends'
    },
    {
        id: 3,
        title: 'Activity Feed',
        value: 'activity_feed'
    },
]

export const socialAppRightPanelAccordion: Tabs[] = [
    {
        id: 1,
        title: 'Profile Intro',
        value: 'profile_intro'
    },
    {
        id: 2,
        title: 'Followers',
        value: 'followers'
    },
    {
        id: 3,
        title: 'Followings',
        value: 'followings'
    },
    {
        id: 4,
        title: 'Latest Photos',
        value: 'latest_photos'
    },
    {
        id: 5,
        title: 'Friends',
        value: 'friends'
    },
]