<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Info Proyek')
                            ->schema([
                                Forms\Components\Select::make('category_id')
                                    ->relationship('category', 'name')
                                    ->required()
                                    ->createOptionForm([
                                        Forms\Components\TextInput::make('name')->required(),
                                        Forms\Components\TextInput::make('slug')->required(),
                                    ]),

                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn(string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                                Forms\Components\TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated()
                                    ->required()
                                    ->unique(Project::class, 'slug', ignoreRecord: true),
                            ]),
                    ])->columnSpan(2),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Media & Status')
                            ->schema([
                                Forms\Components\FileUpload::make('thumbnail')
                                    ->image()
                                    ->imageEditor()
                                    ->imageResizeMode('cover')
                                    ->imageCropAspectRatio('16:9')
                                    ->imageResizeTargetWidth('1920')
                                    ->imageResizeTargetHeight('1080')
                                    ->directory('projects')
                                    ->disk('public')
                                    ->required(),

                                Forms\Components\Toggle::make('is_featured')
                                    ->label('Tampilkan di Home?')
                                    ->default(true),
                            ]),
                    ])->columnSpan(1),

                Forms\Components\Section::make('Teknologi Digunakan')
                    ->schema([
                        Forms\Components\CheckboxList::make('techStacks')
                            ->relationship('techStacks', 'name')
                            ->hiddenLabel()
                            ->columns(4)
                            ->gridDirection('row'),
                    ])->columnSpanFull(),

                Forms\Components\Section::make('Konten Lengkap')
                    ->schema([
                        Forms\Components\Textarea::make('short_description')
                            ->rows(3)
                            ->required()
                            ->label('Deskripsi Singkat (Muncul di Kartu)'),

                        Forms\Components\RichEditor::make('content')
                            ->label('Detail Proyek (Cerita Lengkap)'),

                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('github_link')->url()->prefix('Github'),
                                Forms\Components\TextInput::make('live_link')->url()->prefix('Demo'),
                            ]),
                    ])->columnSpanFull(),

                Forms\Components\Section::make('Galeri Gambar')
                    ->schema([
                        Forms\Components\FileUpload::make('gallery')
                            ->image()
                            ->imageEditor()
                            ->multiple()
                            ->reorderable()
                            ->panelLayout('grid')
                            ->directory('projects/gallery')
                            ->disk('public')
                            ->hiddenLabel(),
                    ])->columnSpanFull(),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail')
                    ->disk('public'),
                Tables\Columns\TextColumn::make('title')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('category.name')->sortable(),
                Tables\Columns\TextColumn::make('techStacks.name')->badge()->separator(','),
                Tables\Columns\ToggleColumn::make('is_featured'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
