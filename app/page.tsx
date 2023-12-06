'use client'

import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import PostCard from '../components/PostCard';
import firebasedb from '@/firebase/firebasedb';
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useSession } from 'next-auth/react';

export interface PostsProps {
    text: string,
    author: string,
    createdAt: number,
    id?: string,
    imageUrl: string, 
    isOver: boolean,
    isParticipantCountPublic: boolean,
    yesCount: number,
    noCount: number,
}

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [openPosts, setOpenPosts] = useState<any>([]);
  const [closePost, setClosePost] = useState<any>([]);
  const { data: session } = useSession();
  
  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    async function getData() {
      const db = getFirestore(firebasedb);
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })); 
      setOpenPosts(data);
    };
    getData();
  }, []);
  

  useEffect(() => {
   localStorage.setItem("username", JSON.stringify(session?.user?.name))
  }, [session?.user?.name])

  return (
    <HomeSection>
      <HomeContainer>
        <TabContainer>
          <TabWrapper>
            <TabButton $isSelected={selectedTab === 1 ? "selected" : null} onClick={() => handleClick(1)}>진행 중</TabButton>
            <TabButton $isSelected={selectedTab === 2 ? "selected" : null} onClick={() => handleClick(2)}>마감</TabButton>
          </TabWrapper>
        </TabContainer>
        <PostContainer>
          {selectedTab === 1 
          ?  
          <>
            {openPosts.map((post: PostsProps) => {
              return (
                <PostCard text={post.text} username={post.author} imageUrl={post.imageUrl} time="종료 시간 : 12:40:00" votingBtn={true} id={post.id} key={post.id}/>
                )})}
          </>
          : 
          <>
            {closePost.map((post: PostsProps) => {
              return (
                <PostCard text={post.text} username={post.author} imageUrl={post.imageUrl} time="종료 시간 : 12:40:00" votingBtn={true} id={post.id} key={post.id}/>
                )})}
          </>
          }
          </PostContainer>
      </HomeContainer>
    </HomeSection>
  )
}

const HomeSection = styled.div`
  display: flex;
  justify-content: center;
  padding:0 20px;
  
`

const HomeContainer = styled.div`
  margin-top:75px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const TabWrapper = styled.div`
  width: 124px;
  font-size: 20px;
  display: flex;
  gap:10px;
  position:static;
  left:0;
`;

const TabButton = styled.div<{$isSelected?: any}>`
  text-decoration: none;
  font-weight: 400;
  cursor: pointer;
  color:${(props) => props.$isSelected === "selected" ? "black" : props.theme.color.dimFontColor}
`;

const PostContainer = styled.div`
  padding-bottom: 99px;
`;
  

export default Tab