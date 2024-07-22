import AnyImage from "../Image/ImageComponent";
import { FC } from "react";
import "./_style_Profile.scss";
import Folowers from "../../images/followers.png";
import Folowing from "../../images/following.png";
import Repositories from "../Repositories/ItemRepository";
import { Trepo } from "../Repositories/ItemRepository";



export type propsProfileComponent= {
    avatar_url: string,
    userName:string,
    name: string,
    login: string,
    followers: number,
    following: number,
    repos_url: string,
    isRepo?: boolean,
    arrOfRepo?: Trepo[];
}


const Profile:FC<propsProfileComponent> = (props)=> {

    const listRepositories = props.arrOfRepo;
    
    return (
        <div className="_main_info">
            <div className="_blockProfile">
                <AnyImage 
                    image = {props.avatar_url} 
                    classNameImage="_avatar_image" 
                    title="avatar" 
                />

            <div className="_blockProfile_userInfo">
                <h2>{props.name}</h2>
                    <a 
                        href={`https://github.com/${props.userName}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="_user_link">
                            {props.login}
                    </a>
                <div className="_blockProfile_follow">
                    <div className="_follow_block">
                        <AnyImage image={Folowers} title="followers" classNameImage="_icon_follow _iconFollowers"/>
                        <p>
                            {props.followers}{props.followers>1000? "k " : " "}{"followers"}
                        </p>
                    </div>
                    <div className="_follow_block">
                        <AnyImage image={Folowing} title="following" classNameImage="_icon_follow _iconFollowing"/>
                        <p>
                            {props.following}{props.following>1000? "k " : " "}{"following"}
                        </p>
                    </div>
                </div>
            </div>
            </div>
                   {
                   listRepositories != undefined? 
                    <div className="_main_repo">
                    <h2>{`Repositories (${listRepositories.length})`}</h2>
                    {
                        listRepositories.map((item)=>
                            <Repositories  
                                name = {item.name}
                                id={item.id}
                                description={item.description}
                                html_url={item.html_url}
                                />
                        )
                    }
                    </div> 
                    : null
                   }               
        </div>
    )
}

export default Profile;