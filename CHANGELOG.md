# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2022-07-18

### Added

 - doc: adding description in swagger
 - feat(playlist): implemetn verifyProfileIdInToken
 - feat(playlist): implement @Length and @db.VarChar
 - doc: adding description in swagger
 - feat: implement files build
 - feat(category): edit name routes
 - feat(song): implement @Length and @db.VarChar
 - style: change id for ID
 - feat(profile-favorite-song): error handling
 - feat(song): change in update song
 - feat(schema playlist): @@unique([categoryId, songId])
 - feat(song): remove albumId and categoryId
 - feat(song): implement categoryIdExist and albumIdExist
 - feat(song): implement @Length and @db.VarChar

### Changed

 - doc: change description in swagger
 - fix(auth): correction in validation


## [0.3.0] - 2022-07-16

### Added

 - feat(album): implement findOneAlbumInArtist and remove findAll
 - feat(prisma): implement onDelete: Cascade and SetNull
 - chore(prisma): implement previewFeature
 - style: optimize imports
 - feat(artist): implement treatment of errors

### Changed

 - fix(country): change name route

### Remove

 - fix: remove @db.VarChar in password


