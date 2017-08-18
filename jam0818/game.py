#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random
import browser
from browser import document as doc
from browser import html, window, console,timer
import math
import manager

canvas = doc["ctx"]
ctx = canvas.getContext("2d")

Image = manager.ImageManager(ctx)
Audio = manager.AudioManager(ctx)
Text = manager.TextManager(ctx)

Key = dict()
KeyList = ["Enter","ShiftRight","ShiftLeft","Space","Escape","ArrowDown","ArrowLeft","ArrowUp","ArrowRight"]

for i in range(26):
    Key["Key"+chr(65+i)] = False
for k in KeyList:
    Key[k] = False
def KeyDown(event):
    if event.code in Key:
        Key[event.code] = True
def KeyUp(event):
    if event.code in Key:
        Key[event.code] = False
doc.bind('keydown',KeyDown)
doc.bind('keyup',KeyUp)

Image.regist("ka","ka.png")
Image.regist("run","run.png")
Image.regist("hunter","hunter.png")
Image.regist("walk","walk.png")
Text.regist("score","50px 'メイリオ'","#000000")
Text.regist("title","100px 'メイリオ'","#000000")

class Ka:
    def __init__(self,pos):
        self.pos=[pos[0],pos[1]]
        self.live=True
        self.blood=0
        self.title=True
        self.time=False

    def drawpos(self):
        return (self.pos[0]-20,self.pos[1]-80)

    def reset(self,pos):
        self.pos=[pos[0],pos[1]]
        self.live=True
        self.blood=0
        self.title=True
        self.time=False

    def draw(self):
        Image.draw("ka",self.drawpos())

    def move(self):
        if Key["KeyW"]:
            self.pos[1] -= 10-(self.blood/1000)
        if Key["KeyS"]:
            self.pos[1] += 10-(self.blood/1000)
        if Key["KeyA"]:
            self.pos[0] -= 10-(self.blood/1000)
        if Key["KeyD"]:
            self.pos[0] += 10-(self.blood/1000)

        dpos = self.drawpos()
        if self.pos[0] < 0:
            self.pos[0] = 0
        if self.pos[0] > canvas.width-100:
            self.pos[0] = canvas.width-100
        if self.pos[1] < 0:
            self.pos[1] = 0
        if self.pos[1] > canvas.height-100:
            self.pos[1] = canvas.height-100

elist=["run","walk","hunter"]
class Teki:
    def __init__(self):
        self.pos = [random.randint(0,1)*700-100,random.randint(0,450)]
        self.type = elist[random.randint(0,2)]
        self.end = False
        self.dir = -(2*((self.pos[0]+100)/700)-1)
        self.turn = 0

    def drawpos(self):
        return (self.pos[0],self.pos[1])

    def ishit(self,ka):
        if ka.pos[1]>self.pos[1] and ka.pos[1]<self.pos[1]+150 and ka.pos[0]>self.pos[0] and ka.pos[0]<self.pos[0]+100:
            if (self.type=="run" or self.type=="hunter") and ((self.dir == 1 and ka.pos[0]>self.pos[0]+50) or (self.dir == -1 and ka.pos[0]<self.pos[0]+50)):
                ka.live=False
            if self.type == "run":
                ka.blood+=5
            elif self.type == "walk":
                ka.blood+=2
            elif self.type == "hunter":
                ka.blood+=10


    def movedraw(self):
        if self.end == False:
            if self.type == "run":
                self.pos[0] += 5*self.dir
            if self.type == "walk":
                self.pos[0] += 3*self.dir
            if self.type == "hunter":
                if self.turn>100 and random.randint(0,100)>97:
                    self.dir *= -1
                    self.turn=0
                self.pos[0] += 1*self.dir
            self.turn += 1
            dpos = self.drawpos()
            if dpos[0] < -200:
                self.end = True
            if dpos[0] > canvas.width:
                self.end = True
        if self.end == False:
            Image.draw(self.type,self.drawpos(),dir=self.dir)

ka = Ka((300,100))
enemys = list()

def timeover():
    if ka.live:
        ka.time = True

def loop():
    ctx.fillStyle="#FFFFF0"
    ctx.clearRect(0,0,canvas.width,canvas.height)
    if ka.title:
        ctx.fillStyle="#FF6666"
        ctx.fillRect(0,0,canvas.width,canvas.height)
        Text.write("title",(100,100),"かの夏休み")
        Text.write("score",(100,500),"press Enter to start")
        if Key["Enter"]:
            ka.title=False

    elif ka.live and ka.time==False:
        ctx.fillRect(0,0,canvas.width,canvas.height)
        Text.write("score",(400,50),"吸ったのは"+str(ka.blood)+"ml")
        if random.randint(0,100)>90 and len(enemys) < 10:
            enemys.append(Teki())
        ka.move()
        ka.draw()
        for i,e in enumerate(enemys):
            if e.end:
                del enemys[i]
            else:
                e.movedraw()
                e.ishit(ka)
    else :
        if ka.time:
            ctx.fillStyle="#FFAAAA"
            ctx.fillRect(0,0,canvas.width,canvas.height)
            Text.write("score",(100,100),"Time Up!")
        else :
            ctx.fillStyle="#FF0000"
            ctx.fillRect(0,0,canvas.width,canvas.height)
            Text.write("score",(100,100),"Dead...")
        Text.write("score",(400,50),"吸ったのは"+str(ka.blood)+"ml")
        Text.write("score",(100,300),"press Space to tweet")
        for i,e in enumerate(enemys):
            del enemys[i]
        if Key["Space"]:
            window.open("https://twitter.com/intent/tweet?text=" +"吸った血は" + str(ka.blood)+ "ml https://hukuda222.github.io/gamejam/jam0818/" + "&hashtags=traP3jam",'_blank')
            ka.reset((300,100))
            Key["Space"]=False
    timer.set_timeout(loop,1000/60)
loop()
timer.set_timeout(timeover,1000*60)
