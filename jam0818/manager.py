#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random
import browser
from browser import document as doc
from browser import html, window, console, timer
import math


class ImageManager:
    def __init__(self, ctx):
        self.images = dict()
        self.loaded = list()
        self.ctx = ctx

    def load(self, key):
        self.loaded.append(key)

    def regist(self, key, src):
        self.images[key] = doc.createElement("img")
        self.images[key].onload = self.load(key)
        self.images[key].src = src

    def draw(self, key, pos, size=None, spos=None, ssize=None, dir=-1):
        if dir == 1:
            self.ctx.save()
            self.ctx.transform(-1, 0, 0, 1, 0, 0)
            if key in self.loaded:
                if size is None:
                    self.ctx.drawImage(self.images[key], -pos[0] - 100, pos[1])
                elif spos is None:
                    self.ctx.drawImage(
                        self.images[key], pos[0], pos[1], size[0], size[1])
                else:
                    self.ctx.drawImage(
                        self.images[key], spos[0], spos[1], ssize[0],
                        ssize[1], pos[0], pos[1], size[0], size[1])
            self.ctx.restore()
        else:
            if key in self.loaded:
                if size is None:
                    self.ctx.drawImage(self.images[key], pos[0], pos[1])
                elif spos is None:
                    self.ctx.drawImage(
                        self.images[key], pos[0], pos[1], size[0], size[1])
                else:
                    self.ctx.drawImage(
                        self.images[key], spos[0], spos[1], ssize[0],
                        ssize[1], pos[0], pos[1], size[0], size[1])


class AudioManager:
    def __init__(self, ctx):
        self.audios = dict()
        self.loaded = list()
        self.ctx = ctx

    def load(self, key):
        self.loaded.append(key)

    def regist(self, key, src):
        self.audios[key] = doc.createElement("audio")
        self.audios[key].onload = self.load(key)
        self.audios[key].src = src

    def play(self, key, loop=False, reset=False):
        if key in self.loaded:
            if reset:
                self.audios[key].currentTime = 0
            self.audios[key].loop = loop
            self.audios[key].play()

    def stop(self, key):
        if key in self.loaded and not self.audios[key].paused:
            self.audios[key].play()

    def manage(self, key, command):
        if key in self.loaded:
            if command == "play":
                self.audios[key].play()
            if command == "pause" and not self.audios[key].paused:
                self.audios[key].pause()
            if command == "stop" and not self.audios[key].paused:
                self.audios[key].pause()
                self.audios[key].currentTime = 0


class TextManager:
    def __init__(self, ctx):
        self.formats = dict()
        self.ctx = ctx

    def regist(self, key, font, color):
        self.formats[key] = dict()
        self.formats[key]["font"] = font
        self.formats[key]["fillStyle"] = color

    def write(self, key, pos, text):
        self.ctx.font = self.formats[key]["font"]
        self.ctx.fillStyle = self.formats[key]["fillStyle"]
        self.ctx.fillText(text, pos[0], pos[1])
